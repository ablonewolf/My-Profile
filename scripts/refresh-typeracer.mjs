import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

export const snapshotPath = new URL('../src/data/typeracer.json', import.meta.url);
const username = 'arkacsedu';
const fields = ['avg_wpm', 'best_wpm', 'total_races', 'total_wins', 'cert_wpm', 'points'];

export function publicSnapshot(payload, now = new Date()) {
  const stats = payload?.data?.find?.(entry => entry.username === username && entry.universe === 'play');
  if (payload?.success !== true || !stats || stats.dqd === true) throw new Error('Invalid profile');
  const safe = Object.fromEntries(fields.map(field => {
    const value = stats[field];
    if (value == null && !['total_races', 'total_wins'].includes(field)) return [field, null];
    if (typeof value !== 'number' || !Number.isFinite(value) || value < 0 ||
        (field.startsWith('total_') && !Number.isSafeInteger(value))) throw new Error('Invalid statistic');
    return [field, value];
  }));
  return { username, updatedAt: now.toISOString(), stats: safe };
}

export async function refresh({ key = process.env.TYPERACER_API_KEY, fetcher = fetch, path = snapshotPath } = {}) {
  // No response bodies, credentials, or exception messages are logged.
  if (!key) {
    console.warn('TypeRacer: secret unavailable; keeping existing public snapshot.');
    return false;
  }
  try {
    const response = await fetcher(`https://data.typeracer.com/api/v1/racers/${username}/stats?universe=play`, {
      headers: { Authorization: `Basic ${Buffer.from(`${username}:${key}`).toString('base64')}` },
      signal: AbortSignal.timeout(15000),
      redirect: 'error',
    });
    if (!response.ok) throw new Error('Request failed');
    const snapshot = publicSnapshot(await response.json());
    await writeFile(path, `${JSON.stringify(snapshot, null, 2)}\n`);
    console.info('TypeRacer: public statistics refreshed.');
    return true;
  } catch {
    console.warn('TypeRacer: refresh failed; keeping existing public snapshot.');
    // Ensure the existing file still exists; repository includes an empty fallback.
    await readFile(path);
    return false;
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) await refresh();
