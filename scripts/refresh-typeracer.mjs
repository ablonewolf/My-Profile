import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

export const snapshotPath = new URL('../src/data/typeracer.json', import.meta.url);
import { username, publicSnapshot, parsePublicProfile, recentAverage } from '../shared/typeracer.mjs';
export { publicSnapshot } from '../shared/typeracer.mjs';
export const publicPath = new URL('../public/typeracer-profile.json', import.meta.url);

export async function refresh({ key = process.env.TYPERACER_API_KEY, fetcher = fetch, path = snapshotPath, outputPath = publicPath } = {}) {
  // Sanitize cached data again before publishing it; never copy unknown fields.
  let previous = { username, updatedAt: null, stats: null };
  try {
    const cached = JSON.parse(await readFile(path, 'utf8'));
    if (cached.stats) previous = parsePublicProfile(cached);
  } catch {
    console.warn('TypeRacer: saved snapshot unavailable; using empty fallback.');
  }
  const publish = snapshot => writeFile(outputPath, `${JSON.stringify(snapshot, null, 2)}\n`);
  // No response bodies, credentials, or exception messages are logged.
  if (!key) {
    console.warn('TypeRacer: secret unavailable; keeping existing public snapshot.');
    await publish(previous);
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
    const races = await fetcher(`https://data.typeracer.com/api/v1/racers/${username}/races?universe=play&n=10`, {
      headers: { Authorization: `Basic ${Buffer.from(`${username}:${key}`).toString('base64')}` },
      signal: AbortSignal.timeout(15000),
      redirect: 'error',
    });
    if (!races.ok) throw new Error('Race request failed');
    snapshot.currentWpm = recentAverage(await races.json());
    await writeFile(path, `${JSON.stringify(snapshot, null, 2)}\n`);
    await publish(snapshot);
    console.info('TypeRacer: public statistics refreshed.');
    return true;
  } catch {
    console.warn('TypeRacer: refresh failed; keeping existing public snapshot.');
    await publish(previous);
    return false;
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) await refresh();
