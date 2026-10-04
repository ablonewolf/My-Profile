import type { PublicProfile } from '../../shared/typeracer.mjs';
export function loadProfile(endpoint: string, options?: {
  signal?: AbortSignal;
  fetcher?: typeof fetch;
  allowLocalhost?: boolean;
}): Promise<PublicProfile>;
