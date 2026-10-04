import test from 'node:test';
import assert from 'node:assert/strict';
import { loadSnapshot, watchSnapshot } from './typeracer.mjs';

const profile = { username: 'arkacsedu', updatedAt: '2026-10-04T08:00:00.000Z',
  stats: { avg_wpm: 80.9, best_wpm: 122.8, cert_wpm: 92.5, total_races: 7508, total_wins: 2052, points: 513038 } };
const settle = () => new Promise(resolve => setImmediate(resolve));
function timers() {
  let id = 0;
  const tasks = new Map();
  return {
    schedule: (fn, delay) => { tasks.set(++id, { fn, delay }); return id; },
    cancel: key => tasks.delete(key),
    run: async delay => {
      const [key, task] = [...tasks].find(([, value]) => value.delay === delay);
      tasks.delete(key);
      await task.fn();
    },
    tasks,
  };
}
test('fetches the public JSON without credentials and validates its values', async () => {
  const result = await loadSnapshot('/My-Profile/typeracer-profile.json', { fetcher: async (url, options) => {
    assert.match(url, /^\/My-Profile\/typeracer-profile\.json\?refresh=\d+$/);
    assert.equal(options.cache, 'no-store');
    assert.equal(options.credentials, 'omit');
    return Response.json({ ...profile, private: 'discard' });
  } });
  assert.deepEqual(result, profile);
  for (const fetcher of [async () => new Response('', { status: 503 }),
    async () => Response.json({ ...profile, stats: { ...profile.stats, avg_wpm: 'bad' } }),
    async () => Response.json({ ...profile, username: 'other' }),
    async () => new Response('bad JSON')]) {
    await assert.rejects(loadSnapshot('/snapshot.json', { fetcher }));
  }
});
test('checks immediately and on the timer, retaining data when a later check fails', async () => {
  const clock = timers();
  const received = [];
  let fail = false;
  let errors = 0;
  const watcher = watchSnapshot('/snapshot.json', { ...clock,
    fetcher: async () => fail ? new Response('', { status: 502 }) : Response.json(profile),
    onSnapshot: snapshot => received.push(snapshot), onError: () => errors++,
  });
  await settle();
  assert.deepEqual(received, [profile]);
  await clock.run(60000);
  assert.equal(received.length, 2);
  fail = true;
  await clock.run(60000);
  assert.equal(errors, 1);
  assert.deepEqual(received[1], profile);
  watcher.stop();
  assert.equal(clock.tasks.size, 0);
});
test('pauses hidden pages and checks on return without overlapping requests', async () => {
  const clock = timers();
  let visible = false;
  let calls = 0;
  let finish;
  const watcher = watchSnapshot('/snapshot.json', { ...clock, isVisible: () => visible,
    fetcher: () => { calls++; return new Promise(resolve => { finish = resolve; }); },
    onSnapshot: () => assert.fail('Stopped watcher must not update'), onError: () => {},
  });
  assert.equal(calls, 0);
  visible = true;
  const pending = watcher.check();
  await watcher.check();
  assert.equal(calls, 1);
  watcher.stop();
  finish(Response.json(profile));
  await pending;
  assert.equal(clock.tasks.size, 0);
});
test('aborts timed-out requests and schedules another check', async () => {
  const clock = timers();
  let errors = 0;
  const watcher = watchSnapshot('/snapshot.json', { ...clock,
    fetcher: async (_, { signal }) => new Promise((resolve, reject) => {
      signal.addEventListener('abort', () => reject(signal.reason), { once: true });
    }), onSnapshot: () => assert.fail('Unexpected update'), onError: () => errors++,
  });
  await clock.run(10000);
  await settle();
  assert.equal(errors, 1);
  assert.ok([...clock.tasks.values()].some(task => task.delay === 60000));
  watcher.stop();
});
