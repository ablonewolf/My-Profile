import test from 'node:test';
import assert from 'node:assert/strict';
import { loadProfile } from './typeracer.mjs';

const profile = { username: 'arkacsedu', updatedAt: '2026-10-04T08:00:00.000Z',
  stats: { avg_wpm: 80.9, best_wpm: 122.8, cert_wpm: 92.5, total_races: 7508, total_wins: 2052, points: 513038 } };
test('loads and sanitizes fresh data without sending credentials or using browser cache', async () => {
  const signal = new AbortController().signal;
  const result = await loadProfile('https://backend.example/api/typeracer', { signal, fetcher: async (url, options) => {
    assert.equal(url, 'https://backend.example/api/typeracer');
    assert.equal(options.signal, signal);
    assert.equal(options.cache, 'no-store');
    assert.equal(options.credentials, 'omit');
    return Response.json({ ...profile, secret: 'discard', stats: { ...profile.stats, private: 'discard' } });
  } });
  assert.deepEqual(result, profile);
});
test('failed requests and malformed profiles reject rather than replacing the saved snapshot', async () => {
  for (const fetcher of [
    async () => { throw new Error('Network error'); },
    async () => new Response('', { status: 429 }),
    async () => new Response('invalid JSON'),
    ...[{ username: 'other' }, { updatedAt: 'invalid' }, { stats: null },
      { stats: { ...profile.stats, total_races: '7508' } }].map(change => async () => Response.json({ ...profile, ...change })),
  ]) await assert.rejects(loadProfile('https://backend.example/api/typeracer', { fetcher }));
});
test('rejects unsafe endpoints while allowing explicitly enabled local development', async () => {
  for (const endpoint of ['http://backend.example/api/typeracer', 'https://key:secret@backend.example/api/typeracer', 'not a URL', 'http://localhost:8787/api/typeracer']) {
    await assert.rejects(loadProfile(endpoint, { fetcher: () => assert.fail('Must not fetch') }));
  }
  assert.deepEqual(await loadProfile('http://localhost:8787/api/typeracer', {
    allowLocalhost: true, fetcher: async () => Response.json(profile),
  }), profile);
});
test('passes cancellation to the request', async () => {
  const controller = new AbortController();
  controller.abort();
  await assert.rejects(loadProfile('https://backend.example/api/typeracer', {
    signal: controller.signal, fetcher: async (_, { signal }) => { signal.throwIfAborted(); },
  }));
});
