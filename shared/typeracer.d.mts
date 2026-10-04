export type Stats = {
  avg_wpm: number | null;
  best_wpm: number | null;
  total_races: number;
  total_wins: number;
  cert_wpm: number | null;
  points: number | null;
};
export type Profile = { username: string; updatedAt: string | null; stats: Stats | null; currentWpm?: number | null };
export type PublicProfile = { username: 'arkacsedu'; updatedAt: string; stats: Stats; currentWpm?: number | null };
export const username: 'arkacsedu';
export function publicSnapshot(payload: unknown, now?: Date): PublicProfile;
export function parsePublicProfile(input: unknown): PublicProfile;

export function recentAverage(payload: unknown): number | null;
