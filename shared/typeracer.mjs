export const username = 'arkacsedu';
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


// Treat backend responses as untrusted input before putting values into the UI.
export function parsePublicProfile(input) {
  if (input?.username !== username || !input.stats ||
      typeof input.updatedAt !== 'string' || !Number.isFinite(Date.parse(input.updatedAt))) {
    throw new Error('Invalid profile');
  }
  return publicSnapshot({ success: true, data: [{
    ...input.stats, username, universe: 'play',
  }] }, new Date(input.updatedAt));
}
