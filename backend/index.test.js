import test from 'node:test';
import assert from 'node:assert/strict';
import { createWorker } from './index.js';

const origin = 'https://ablonewolf.github.io';
const env = { ALLOWED_ORIGINS: origin, TYPERACER_API_KEY: 'mock-secret',
  PROFILE_LIMITER: { limit: async () => ({ success: true }) } };
const request = (path = '/api/typeracer', method = 'GET', from = origin) =>
  new Request(`https://backend.example${path}`, { method, headers: from ? { Origin: from } : {} });
const stats = { username: 'arkacsedu', universe: 'play', total_races: 10, total_wins: 4,
  avg_wpm: 80.9, best_wpm: 122.8, cert_wpm: 92.5, points: 1000, private_value: 'secret' };
const payload = { success: true, data: [stats] };

test('fetches fresh on each request and returns only validated public data', async () => {
  let calls = 0;
  const worker = createWorker({ fetcher: async (url, options) => {
    calls++;
    assert.equal(url, 'https://data.typeracer.com/api/v1/racers/arkacsedu/stats?universe=play');
    assert.equal(options.redirect, 'error');
    assert.equal(options.cache, 'no-store');
    assert.equal(options.headers.Authorization, `Basic ${btoa('arkacsedu:mock-secret')}`);
    return Response.json(payload);
  } });
  for (let i = 0; i < 2; i++) {
    const response = await worker.fetch(request(), env);
    assert.equal(response.status, 200);
    assert.equal(response.headers.get('Cache-Control'), 'no-store');
    assert.equal(response.headers.get('Access-Control-Allow-Origin'), origin);
    const body = await response.json();
    assert.equal(body.stats.cert_wpm, 92.5);
    assert.equal(Object.keys(body.stats).length, 6);
    assert.equal(JSON.stringify(body).includes('secret'), false);
    assert.ok(Number.isFinite(Date.parse(body.updatedAt)));
  }
  assert.equal(calls, 2);
});
test('routing, CORS, preflight, methods and configuration cannot reach upstream', async () => {
  const worker = createWorker({ fetcher: () => assert.fail('Unexpected fetch') });
  for (const [req, config, status] of [
    [request('/api/typeracer', 'GET', 'https://evil.example'), env, 403],
    [request('/api/typeracer', 'GET', null), env, 403],
    [request('/unknown'), env, 404],
    [request('/api/typeracer?user=other'), env, 404],
    [request('/api/typeracer', 'POST'), env, 405],
    [request('/api/typeracer', 'OPTIONS'), env, 204],
    [request(), { ...env, TYPERACER_API_KEY: '' }, 503],
    [request(), { ...env, PROFILE_LIMITER: null }, 503],
  ]) assert.equal((await worker.fetch(req, config)).status, status);
  const denied = await worker.fetch(request('/api/typeracer', 'GET', 'https://evil.example'), env);
  assert.equal(denied.headers.has('Access-Control-Allow-Origin'), false);
});
test('rate limits do not fetch upstream', async () => {
  const worker = createWorker({ fetcher: () => assert.fail('Unexpected fetch') });
  const response = await worker.fetch(request(), { ...env, PROFILE_LIMITER: { limit: async () => ({ success: false }) } });
  assert.equal(response.status, 429);
  assert.equal(response.headers.get('Retry-After'), '60');
});
test('upstream HTTP errors, invalid and oversized bodies expose no sensitive content', async () => {
  for (const fetcher of [
    async () => { throw new Error('mock-secret'); },
    async () => new Response('mock-secret', { status: 401 }),
    async () => new Response('mock-secret'),
    async () => Response.json({ success: true, data: [{ ...stats, avg_wpm: 'bad' }] }),
    async () => Response.json({ success: true, data: [{ ...stats, dqd: true }] }),
    async () => new Response('x'.repeat(65537)),
  ]) {
    const response = await createWorker({ fetcher }).fetch(request(), env);
    assert.equal(response.status, 502);
    assert.deepEqual(await response.json(), { error: 'Statistics unavailable' });
  }
  const response = await createWorker({ fetcher: async () => new Response('mock-secret', { status: 429 }) }).fetch(request(), env);
  assert.equal(response.status, 429);
});
test('aborts an upstream timeout and returns a safe error', async () => {
  const worker = createWorker({ timeoutMs: 10, fetcher: async (_, { signal }) =>
    new Promise((resolve, reject) => {
      const timer = setTimeout(resolve, 1000);
      signal.addEventListener('abort', () => { clearTimeout(timer); reject(signal.reason); }, { once: true });
    }) });
  assert.equal((await worker.fetch(request(), env)).status, 502);
});
