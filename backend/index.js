import { username, publicSnapshot } from '../shared/typeracer.mjs';

async function readJson(response) {
  const reader = response.body.getReader();
  const chunks = [];
  let size = 0;
  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 65536) {
        await reader.cancel();
        throw new Error('Response too large');
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }
  const bytes = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return JSON.parse(new TextDecoder().decode(bytes));
}

export function createWorker({ fetcher = fetch, timeoutMs = 8000 } = {}) {
  return {
    async fetch(request, env) {
      const url = new URL(request.url);
      const origin = request.headers.get('Origin');
      const allowed = (env.ALLOWED_ORIGINS || '').split(',').map(value => value.trim()).filter(Boolean);
      const headers = { 'Cache-Control': 'no-store', 'Vary': 'Origin', 'X-Content-Type-Options': 'nosniff' };
      const reply = (status, error) => Response.json({ error }, { status, headers });
      // Origin checks constrain browser access; this is still a public endpoint.
      if (!origin || !allowed.includes(origin)) return reply(403, 'Origin not allowed');
      headers['Access-Control-Allow-Origin'] = origin;
      if (url.pathname !== '/api/typeracer' || url.search) return reply(404, 'Not found');
      if (request.method === 'OPTIONS') {
        return new Response(null, { status: 204, headers: {
          ...headers, 'Access-Control-Allow-Methods': 'GET, OPTIONS',
          'Access-Control-Max-Age': '600',
        } });
      }
      if (request.method !== 'GET') {
        headers.Allow = 'GET, OPTIONS';
        return reply(405, 'Method not allowed');
      }
      if (!env.TYPERACER_API_KEY || !env.PROFILE_LIMITER) return reply(503, 'Statistics unavailable');
      try {
        // One shared profile key limits upstream traffic per Cloudflare location.
        const { success } = await env.PROFILE_LIMITER.limit({ key: username });
        if (!success) {
          headers['Retry-After'] = '60';
          return reply(429, 'Please try again later');
        }
        const credentials = new TextEncoder().encode(`${username}:${env.TYPERACER_API_KEY}`);
        const encoded = btoa(Array.from(credentials, byte => String.fromCharCode(byte)).join(''));
        const response = await fetcher(`https://data.typeracer.com/api/v1/racers/${username}/stats?universe=play`, {
          headers: { Authorization: `Basic ${encoded}` },
          signal: AbortSignal.timeout(timeoutMs),
          redirect: 'error',
          cache: 'no-store',
        });
        if (!response.ok) {
          if (response.status === 429) {
            headers['Retry-After'] = '60';
            return reply(429, 'Please try again later');
          }
          return reply(502, 'Statistics unavailable');
        }
        const snapshot = publicSnapshot(await readJson(response));
        return Response.json(snapshot, { headers });
      } catch {
        // Never return/log raw upstream errors, responses, or credentials.
        return reply(502, 'Statistics unavailable');
      }
    },
  };
}

export default createWorker();
