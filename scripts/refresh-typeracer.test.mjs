import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, readFile, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
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
  try {
    await writeFile(path, 'previous');
    assert.equal(await refresh({ key: '', path, fetcher: () => assert.fail('must not fetch') }), false);
    for (const fetcher of [async () => { throw new Error('sensitive'); }, async () => ({ ok: false }),
      async () => ({ ok: true, json: async () => ({ success: false }) })]) {
      assert.equal(await refresh({ key: 'test-key', path, fetcher }), false);
      assert.equal(await readFile(path, 'utf8'), 'previous');
    }
    assert.equal(await refresh({ key: 'test-key', path, fetcher: async (url, options) => {
      assert.match(url, /universe=play/);
      assert.equal(options.redirect, 'error');
      assert.equal(options.headers.Authorization, `Basic ${Buffer.from('arkacsedu:test-key').toString('base64')}`);
      return { ok: true, json: async () => payload };
    } }), true);
    assert.equal((await readFile(path, 'utf8')).includes('test-key'), false);
  } finally { await rm(directory, { recursive: true }); }
});
