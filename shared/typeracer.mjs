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


// Treat published snapshots as untrusted input before putting values into the UI.
export function parsePublicProfile(input) {
  if (input?.username !== username || !input.stats ||
      typeof input.updatedAt !== 'string' || !Number.isFinite(Date.parse(input.updatedAt))) {
    throw new Error('Invalid profile');
  }
  const result = publicSnapshot({ success: true, data: [{
    ...input.stats, username, universe: 'play',
  }] }, new Date(input.updatedAt));
  if (input.currentWpm != null) {
    if (typeof input.currentWpm != 'number' || !Number.isFinite(input.currentWpm) || input.currentWpm < 0) throw new Error('Invalid current speed');
    result.currentWpm = input.currentWpm;
  }
  return result;
}

// Publish the mean only when all ten recent race speeds are available.
export function recentAverage(payload) {
  if (payload?.success !== true || !Array.isArray(payload.data)) throw new Error('Invalid races');
  const races = payload.data;
  if (races.length > 10 || races.some(race => race.user !== username || race.univ !== 'play' ||
      !Number.isSafeInteger(race.rn) || race.rn < 1)) throw new Error('Invalid races');
  if (new Set(races.map(race => race.rn)).size !== races.length) throw new Error('Duplicate races');
  if (races.length !== 10 || races.some(race => race.wpm == null)) return null;
  if (races.some(race => typeof race.wpm !== 'number' || !Number.isFinite(race.wpm) || race.wpm < 0)) throw new Error('Invalid speed');
  return races.reduce((sum, race) => sum + race.wpm / 10, 0);
}
