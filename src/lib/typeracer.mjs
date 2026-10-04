import { parsePublicProfile } from '../../shared/typeracer.mjs';

export async function loadSnapshot(endpoint, { signal, fetcher = fetch } = {}) {
  const url = `${endpoint}${endpoint.includes('?') ? '&' : '?'}refresh=${Date.now()}`;
  const response = await fetcher(url, { signal, cache: 'no-store', credentials: 'omit' });
  if (!response.ok) throw new Error('Snapshot unavailable');
  const data = await response.json();
  if (data?.username === 'arkacsedu' && data.stats === null && data.updatedAt === null) return data;
  return parsePublicProfile(data);
}

// Use a recursive timer to avoid overlapping requests. Pausing hidden pages keeps
// polling light; the visibility event below fetches immediately on return.
export function watchSnapshot(endpoint, {
  onSnapshot, onError, isVisible = () => true, intervalMs = 60000,
  timeoutMs = 10000, fetcher = fetch, schedule = setTimeout, cancel = clearTimeout,
} = {}) {
  let stopped = false;
  let controller;
  let timer;
  let pending = false;
  const check = async () => {
    if (stopped || pending) return;
    cancel(timer);
    if (!isVisible()) {
      timer = schedule(check, intervalMs);
      return;
    }
    pending = true;
    controller = new AbortController();
    const timeout = schedule(() => controller.abort(), timeoutMs);
    try {
      const snapshot = await loadSnapshot(endpoint, { signal: controller.signal, fetcher });
      if (!stopped) onSnapshot(snapshot);
    } catch {
      if (!stopped) onError();
    } finally {
      cancel(timeout);
      pending = false;
      if (!stopped) timer = schedule(check, intervalMs);
    }
  };
  void check();
  return {
    check,
    stop() { stopped = true; cancel(timer); controller?.abort(); },
  };
}
