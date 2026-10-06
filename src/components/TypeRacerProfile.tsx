import { useEffect, useState } from 'react';
import snapshot from '../data/typeracer.json';
import type { Profile } from '../../shared/typeracer.mjs';
import { watchSnapshot } from '../lib/typeracer.mjs';

const savedProfile = snapshot as Profile;
const endpoint = `${import.meta.env.BASE_URL}typeracer-profile.json`;
const number = (value: number | null | undefined, decimals = 0) => value == null ? '—' :
  value.toLocaleString('en-US', { maximumFractionDigits: decimals });

const TypeRacerProfile = () => {
  const [profile, setProfile] = useState<Profile>(savedProfile);
  const [status, setStatus] = useState<'checking' | 'available' | 'saved'>('checking');

  useEffect(() => {
    const watcher = watchSnapshot(endpoint, {
      isVisible: () => !document.hidden,
      onSnapshot: current => {
        if (!current.stats) {
          setStatus('saved');
          return;
        }
        setProfile(previous => !previous.updatedAt ||
          Date.parse(current.updatedAt ?? '') >= Date.parse(previous.updatedAt) ? current : previous);
        setStatus('available');
      },
      onError: () => setStatus('saved'),
    });
    const onVisible = () => { if (!document.hidden) void watcher.check(); };
    document.addEventListener('visibilitychange', onVisible);
    return () => {
      document.removeEventListener('visibilitychange', onVisible);
      watcher.stop();
    };
  }, []);

  const { stats, updatedAt } = profile;
  return (
    <section aria-labelledby="typeracer-heading" className="md:col-span-2 border-t border-gray-200 pt-6 min-w-0">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <h3 id="typeracer-heading" className="font-semibold text-gray-800">My TypeRacer Profile</h3>
        <a href="https://data.typeracer.com/pit/profile?user=arkacsedu" target="_blank" rel="noopener noreferrer"
          className="text-blue-700 hover:underline rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-700"
          aria-label="View arkacsedu’s TypeRacer profile (opens in a new tab)">
          View Profile <span aria-hidden="true">↗</span>
        </a>
      </div>
      {stats ? (
        <>
          <dl className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-5">
            <div>
              <dt className="text-sm text-gray-600">Current WPM</dt>
              <dd className="text-3xl font-bold text-blue-700 tabular-nums mt-1">{number(profile.currentWpm, 1)}</dd>
              <dd className="text-xs text-gray-500 mt-1">Average of last 10 races</dd>
            </div>
            <div>
              <dt className="text-sm text-gray-600">Average WPM</dt>
              <dd className="text-3xl font-bold text-blue-700 tabular-nums mt-1">{number(stats.avg_wpm, 1)}</dd>
            </div>
            <div>
              <dt className="text-sm text-gray-600">Best WPM</dt>
              <dd className="text-2xl font-semibold text-gray-800 tabular-nums mt-1">{number(stats.best_wpm, 1)}</dd>
            </div>

            <div>
              <dt className="text-sm text-gray-600">Total races</dt>
              <dd className="text-2xl font-semibold text-gray-800 tabular-nums mt-1">{number(stats.total_races)}</dd>
            </div>
          </dl>
          <dl className="flex flex-wrap gap-x-6 gap-y-2 mt-5 text-sm text-gray-600">
            <div className="flex gap-1"><dt>Certified WPM:</dt><dd className="font-bold text-blue-700">{number(stats.cert_wpm, 1)}</dd></div>
            <div className="flex gap-1"><dt>Wins:</dt><dd className="font-medium text-gray-800">{number(stats.total_wins)}</dd></div>
            {stats.points !== null && <div className="flex gap-1"><dt>Points:</dt><dd className="font-medium text-gray-800">{number(stats.points)}</dd></div>}
          </dl>

          {updatedAt && <p className="text-xs text-gray-500 mt-4">Last updated <time dateTime={updatedAt}>{new Date(updatedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', timeZoneName: 'short' })}</time>.</p>}
        </>
      ) : <p className="text-sm text-gray-600">Statistics are currently unavailable. View my TypeRacer profile for the latest scores.</p>}
      <p role="status" aria-live="polite" className="text-xs text-gray-600 mt-2">
        {status === 'checking' ? 'Checking published statistics…' : status === 'available' ?
          'Current updated type speed' :
          (stats ? 'Update check unavailable. Showing saved statistics.' : 'No published statistics available yet.')}
      </p>
    </section>
  );
};

export default TypeRacerProfile;
