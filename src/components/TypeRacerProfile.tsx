import { useEffect, useState } from 'react';
import snapshot from '../data/typeracer.json';
import type { Profile } from '../../shared/typeracer.mjs';
import { loadProfile } from '../lib/typeracer.mjs';

const savedProfile = snapshot as Profile;
const endpoint = import.meta.env.VITE_TYPERACER_API_URL?.trim();
const number = (value: number | null, decimals = 0) => value === null ? '—' :
  value.toLocaleString('en-US', { maximumFractionDigits: decimals });

const TypeRacerProfile = () => {
  const [profile, setProfile] = useState<Profile>(savedProfile);
  const [status, setStatus] = useState<'loading' | 'live' | 'saved'>(endpoint ? 'loading' : 'saved');

  useEffect(() => {
    if (!endpoint) return;
    let active = true;
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 10000);
    loadProfile(endpoint, {
      signal: controller.signal,
      allowLocalhost: ['localhost', '127.0.0.1'].includes(window.location.hostname),
    }).then(current => {
      if (active) {
        setProfile(current);
        setStatus('live');
      }
    }).catch(() => {
      if (active) setStatus('saved');
    }).finally(() => window.clearTimeout(timeout));
    return () => {
      active = false;
      controller.abort();
      window.clearTimeout(timeout);
    };
  }, []);

  const { stats, updatedAt } = profile;
  return (
    <section aria-busy={status === 'loading'} aria-labelledby="typeracer-heading" className="md:col-span-2 border-t border-gray-200 pt-6 min-w-0">
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
          <dl className={`grid grid-cols-2 ${stats.cert_wpm !== null ? 'sm:grid-cols-4' : 'sm:grid-cols-3'} gap-x-4 gap-y-5`}>
            <div className={stats.cert_wpm !== null ? '' : 'col-span-2 sm:col-span-1'}>
              <dt className="text-sm text-gray-600">Average WPM</dt>
              <dd className="text-3xl font-bold text-blue-700 tabular-nums mt-1">{number(stats.avg_wpm, 1)}</dd>
            </div>
            <div>
              <dt className="text-sm text-gray-600">Best WPM</dt>
              <dd className="text-2xl font-semibold text-gray-800 tabular-nums mt-1">{number(stats.best_wpm, 1)}</dd>
            </div>
            {stats.cert_wpm !== null && (
              <div>
                <dt className="text-sm text-gray-600">Certified WPM</dt>
                <dd className="text-3xl font-bold text-blue-700 tabular-nums mt-1">{number(stats.cert_wpm, 1)}</dd>
              </div>
            )}
            <div>
              <dt className="text-sm text-gray-600">Total races</dt>
              <dd className="text-2xl font-semibold text-gray-800 tabular-nums mt-1">{number(stats.total_races)}</dd>
            </div>
          </dl>
          <dl className="flex flex-wrap gap-x-6 gap-y-2 mt-5 text-sm text-gray-600">
            <div className="flex gap-1"><dt>Wins:</dt><dd className="font-medium text-gray-800">{number(stats.total_wins)}</dd></div>
            {stats.points !== null && <div className="flex gap-1"><dt>Points:</dt><dd className="font-medium text-gray-800">{number(stats.points)}</dd></div>}
          </dl>
          {updatedAt && <p className="text-xs text-gray-500 mt-4">Last updated <time dateTime={updatedAt}>{new Date(updatedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', timeZoneName: 'short' })}</time>.</p>}
        </>
      ) : <p className="text-sm text-gray-600">Statistics are currently unavailable. View my TypeRacer profile for the latest scores.</p>}
      <p role="status" aria-live="polite" className="text-xs text-gray-600 mt-2">
        {status === 'loading' ? 'Checking latest statistics…' : status === 'live' ?
          'Latest statistics fetched on page load.' : endpoint ?
            (stats ? 'Live update unavailable. Showing saved statistics.' : 'Live update unavailable.') :
            (stats ? 'Showing saved statistics.' : 'Live statistics are not connected yet.')}
      </p>
    </section>
  );
};

export default TypeRacerProfile;
