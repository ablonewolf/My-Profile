import type { Profile } from '../../shared/typeracer.mjs';
export function loadSnapshot(endpoint: string, options?: {
  signal?: AbortSignal;
  fetcher?: typeof fetch;
}): Promise<Profile>;
export function watchSnapshot(endpoint: string, options: {
  onSnapshot: (snapshot: Profile) => void;
  onError: () => void;
  isVisible?: () => boolean;
  intervalMs?: number;
  timeoutMs?: number;
}): { check: () => Promise<void>; stop: () => void };
