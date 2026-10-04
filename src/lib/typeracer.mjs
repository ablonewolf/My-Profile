import { parsePublicProfile } from '../../shared/typeracer.mjs';

export async function loadProfile(endpoint, { signal, fetcher = fetch, allowLocalhost = false } = {}) {
  const url = new URL(endpoint);
  const local = allowLocalhost && ['localhost', '127.0.0.1'].includes(url.hostname);
  if (url.username || url.password || (url.protocol !== 'https:' && !(local && url.protocol === 'http:'))) {
    throw new Error('Invalid endpoint');
  }
  const response = await fetcher(url.href, { signal, cache: 'no-store', credentials: 'omit' });
  if (!response.ok) throw new Error('Statistics unavailable');
  return parsePublicProfile(await response.json());
}
