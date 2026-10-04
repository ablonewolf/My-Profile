import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, readFile, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { recentAverage } from '../shared/typeracer.mjs';
import { publicSnapshot, refresh } from './refresh-typeracer.mjs';

const stats = { username: 'arkacsedu', universe: 'play', avg_wpm: 82.4, best_wpm: 121.6,
  total_races: 3842, total_wins: 1426, cert_wpm: null, points: 0, private_field: 'never publish' };
const payload = { success: true, data: [{ ...stats, universe: 'other' }, stats] };
test('selects play universe and publishes only allowlisted statistics', () => {
  const result = publicSnapshot(payload);
  assert.equal(result.stats.avg_wpm, 82.4);
  assert.equal(result.stats.points, 0);
  assert.equal(result.stats.cert_wpm, null);
  assert.equal(Object.keys(result.stats).length, 6);
  assert.equal(JSON.stringify(result).includes('private_field'), false);
});
test('rejects malformed, unsuccessful, wrong-user and disqualified data', () => {
  for (const bad of [{ success: false, data: [stats] }, { success: true, data: [] },
    ...[{ avg_wpm: '82' }, { best_wpm: -1 }, { total_races: 1.5 }, { username: 'other' }, { dqd: true }]
      .map(change => ({ success: true, data: [{ ...stats, ...change }] }))]) {
    assert.throws(() => publicSnapshot(bad));
  }
});
test('missing secret and failed requests preserve snapshot; success writes safe data', async () => {
  const directory = await mkdtemp(join(tmpdir(), 'typeracer-'));
  const path = join(directory, 'snapshot.json');
  const outputPath = join(directory, 'public.json');
  try {
    const previous = publicSnapshot(payload, new Date('2026-10-03T00:00:00Z'));
    await writeFile(path, JSON.stringify(previous));
    assert.equal(await refresh({ key: '', path, outputPath, fetcher: () => assert.fail('must not fetch') }), false);
    for (const fetcher of [async () => { throw new Error('sensitive'); }, async () => ({ ok: false }),
      async () => ({ ok: true, json: async () => ({ success: false }) })]) {
      assert.equal(await refresh({ key: 'test-key', path, outputPath, fetcher }), false);
      assert.deepEqual(JSON.parse(await readFile(path, 'utf8')), previous);
      assert.deepEqual(JSON.parse(await readFile(outputPath, 'utf8')), previous);
    }
    assert.equal(await refresh({ key: 'test-key', path, outputPath, fetcher: async (url, options) => {
      assert.match(url, /universe=play/);
      assert.equal(options.redirect, 'error');
      assert.equal(options.headers.Authorization, `Basic ${Buffer.from('arkacsedu:test-key').toString('base64')}`);
      return { ok: true, json: async () => url.includes('/races?') ? racesPayload : payload };
    } }), true);
    assert.equal((await readFile(path, 'utf8')).includes('test-key'), false);
    assert.deepEqual(JSON.parse(await readFile(path, 'utf8')), JSON.parse(await readFile(outputPath, 'utf8')));
  } finally { await rm(directory, { recursive: true }); }
});

const racesPayload = { success: true, data: Array.from({ length: 10 }, (_, i) => ({
  user: 'arkacsedu', univ: 'play', rn: 100 - i, wpm: 80 + i, kl: 'private keylog',
})) };
test('current speed averages ten races, independent of ordering, without publishing race details', () => {
  assert.equal(recentAverage(racesPayload), 84.5);
  assert.equal(recentAverage({ ...racesPayload, data: [...racesPayload.data].reverse() }), 84.5);
  assert.equal(recentAverage({ success: true, data: racesPayload.data.slice(0, 9) }), null);
  assert.equal(recentAverage({ success: true, data: racesPayload.data.map((r, i) => i ? r : { ...r, wpm: null }) }), null);
  for (const change of [{ user: 'other' }, { univ: 'other' }, { wpm: -1 }, { wpm: '90' }, { rn: 99 }]) {
    assert.throws(() => recentAverage({ success: true, data: racesPayload.data.map((r, i) => i ? r : { ...r, ...change }) }));
  }
});
