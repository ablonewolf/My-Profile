# Live TypeRacer backend setup

This backend is plain JavaScript: a Cloudflare Worker using built-in `fetch`,
`Request`, and `Response`, with no application framework or runtime packages.
Wrangler is development/deployment tooling, installed separately from the React
app. Both frontend and backend code stay in `ablonewolf/My-Profile`.

The Worker handles only `GET /api/typeracer` for `arkacsedu` in the `play` universe.
Each allowed request fetches the latest data exposed by TypeRacer's stats API.
There is no intentional success cache or background polling. An already-open
page updates when you reload it, rather than after every race automatically.
TypeRacer may have its own processing delay. Average WPM is the all-time API
average; Certified WPM is the certified speed, not necessarily the latest race.

## What you need to configure manually

You need a Cloudflare account, your TypeRacer API key, and access to this
repository's GitHub settings. You do not need to move GitHub Pages, buy a domain,
or put any credential into React. The existing GitHub secret is not available
to Cloudflare automatically.

### 1. Get the code and install the tools

Use Node.js 22 or newer (Node.js 24 is used by the backend checks). From your
local repository root, before merging:

```bash
git fetch origin
git switch feat/live-typeracer-worker
npm ci
npm ci --prefix backend
```

If you have already merged the pull request, use `git switch main` followed by
`git pull --ff-only` instead. Keep your existing local edits when switching.

### 2. Test locally before deploying (recommended)

Copy `backend/.dev.vars.example` to `backend/.dev.vars` and edit the new file:

```bash
cp backend/.dev.vars.example backend/.dev.vars
```

Replace `replace_with_your_key` with your actual TypeRacer API key **only inside
`backend/.dev.vars`**. Keep the two local origins as shown. The file is ignored
by Git. You can use the same key you placed in the GitHub repository secret.
If you no longer have it, create a new key in TypeRacer under **Edit Profile →
Manage Your API Keys**. Never paste the key into chat, a command, a tracked file,
or a `VITE_` variable.

In the repository root, create or edit `.env.local`. Add this public URL:

```dotenv
VITE_TYPERACER_API_URL=http://localhost:8787/api/typeracer
```

This URL contains no credential. `.env.local` is also ignored by Git.

In one terminal, start the Worker:

```bash
npm --prefix backend run dev
```

In another terminal, start the frontend:

```bash
npm run dev
```

Open `http://localhost:5173/My-Profile/` and check the About panel. A successful
live request displays **Latest statistics fetched on page load.** The update
time includes the time of day and your browser's timezone. Check desktop and
mobile widths. Complete a race, then reload the portfolio; the stats will update
once TypeRacer's API reflects it. The meaning of each statistic stays unchanged.

To inspect the local backend directly, send the same Origin as the frontend:

```bash
curl -i -H 'Origin: http://localhost:5173' http://localhost:8787/api/typeracer
```

A 200 response contains only the public fields. Directly navigating to the
endpoint in a browser can return 403 because navigation typically sends no
Origin header; test via the portfolio or the command above.

Stop the Worker and reload the portfolio to test failure behavior. It should
show **Live update unavailable. Showing saved statistics.** if the build snapshot
contains data, or an unavailable message and the profile link if it does not.

Run all checks:

```bash
npm test
npm run lint
npm run build
npm --prefix backend run check
```

The automated tests use mocks and do not need a real API key. `check` packages
the Worker without deploying it. For the production frontend locally, run
`npm run preview` and open `http://localhost:4173/My-Profile/` with the Worker
still running. Restart Vite/rebuild after changing `.env.local`.

### 3. Create your Cloudflare account and deploy the backend

Create/sign into an account at https://dash.cloudflare.com/. The Workers Free
plan is sufficient to get started; no domain transfer is needed. From your local
repository root, authenticate the CLI:

```bash
npm --prefix backend exec -- wrangler login
```

A browser opens. Sign in and approve Wrangler access. Then deploy the backend:

```bash
npm --prefix backend run deploy
```

If asked, select your Cloudflare account and register a `workers.dev` subdomain.
The configured Worker name is `my-profile-typeracer`. Copy the actual HTTPS URL
printed by the deployment, for example:

```text
https://my-profile-typeracer.YOUR-SUBDOMAIN.workers.dev
```

This is a placeholder example: use your actual URL. The initial deployment
returns 503 for stats until its runtime secret is configured. Local `.dev.vars`
values are not automatically uploaded to production.

### 4. Add the private Cloudflare runtime secret

From the repository root, run:

```bash
npm --prefix backend run secret
```

At Wrangler's hidden prompt, paste the TypeRacer API key alone. The command
creates/updates the runtime secret named **`TYPERACER_API_KEY`** on this Worker.
It does not copy the key into source code. It also deploys the secret update.

Alternatively, in the Cloudflare dashboard open **Workers & Pages →
my-profile-typeracer → Settings → Variables and Secrets → Add**. Select type
**Secret**, name **`TYPERACER_API_KEY`**, and value **your API key alone**, then
choose **Deploy**. Use either the CLI or dashboard, not both.

Verify the deployed backend before connecting the frontend:

```bash
curl -i -H 'Origin: https://ablonewolf.github.io' https://YOUR-ACTUAL-WORKER-URL/api/typeracer
```

Replace the URL with the one Cloudflare printed. Expect HTTP 200, a recent
`updatedAt`, and the six allowlisted statistics. Your API key must not appear.
Keep the existing GitHub Actions secret too: it maintains the fallback snapshot.

### 5. Set the public backend URL in GitHub

Open https://github.com/ablonewolf/My-Profile/settings/variables/actions.
Choose the **Variables** tab, then **New repository variable**:

- Name: **`TYPERACER_API_URL`**
- Value: your complete HTTPS Worker URL followed by **`/api/typeracer`**

For example, `https://my-profile-typeracer.YOUR-SUBDOMAIN.workers.dev/api/typeracer`.
This is a public variable, not a secret. The Pages build maps it to
`VITE_TYPERACER_API_URL`. Never use the API key as this value.

### 6. Deploy the frontend and verify it

Merge the backend pull request into `main` once local testing is satisfactory.
The existing **Deploy to GitHub Pages** workflow will build and deploy the
portfolio. If you set the URL variable after merging, open **Actions → Deploy
to GitHub Pages → Run workflow**, select `main`, and start it. Changing a
repository variable alone does not rebuild Vite.

Open https://ablonewolf.github.io/My-Profile/ and reload it. The About panel
should display **Latest statistics fetched on page load.** Check Average WPM,
Best WPM, emphasized Certified WPM, races, wins, and points against TypeRacer.
The existing portfolio URL, SEO files, and frontend hosting remain unchanged.

### 7. Future backend deployments

The included GitHub workflow validates the Worker but does not deploy it to
Cloudflare. After changing backend or shared validator code, update your local
checkout and run `npm --prefix backend run deploy` again. Runtime secrets remain
configured on the Worker across normal code deployments.

If you want automatic backend deployments, Cloudflare Workers Builds can
connect to this same GitHub repository: use production branch `main`, root
folder `backend`, no application build command, and deploy command
`npm run deploy`. Include both `backend/**` and `shared/**` in build watch paths
because the Worker imports the shared validator outside its folder. Keep the
Worker name `my-profile-typeracer` matching `wrangler.jsonc`. Configure the API
key as a runtime Worker secret, not solely a build variable. This connection is
optional; manual deployment is enough for the initial setup.

## Failure behavior and request limits

Responses and browser requests use `no-store`. No credentials are sent from the
browser. The Worker refuses unconfigured origins, methods other than GET and
OPTIONS, arbitrary usernames/URLs, malformed data, disqualified stats, redirects,
and responses over 64 KiB. Upstream requests time out after eight seconds; the
frontend gives up after ten seconds. Raw errors and response bodies are not
logged or returned to visitors.

The profile endpoint allows approximately 30 upstream requests per minute per
Cloudflare location through a rate-limit binding. It returns 429 when that
limit or TypeRacer's limit is reached. Browser Origin checks are not a substitute
for authentication: non-browser clients can forge the header, so the limiter
also matters. Cloudflare's limiter is regional and approximate; it cannot
promise a strict worldwide TypeRacer quota. High traffic may require changing
the rate limit, upgrading API access, or agreeing to a brief cache interval.
The UI always reports a saved fallback when the live request fails, rather than
claiming old values are current. There is no automatic retry loop.

The weekly Pages workflow retains its existing build-time refresh to keep the
fallback reasonably recent. It restores/caches only the public snapshot; cache
eviction may leave no saved statistics until another successful build refresh.

## Troubleshooting

| Symptom | What to check |
| --- | --- |
| `Live statistics are not connected yet` | Set `TYPERACER_API_URL` in GitHub and rebuild Pages; locally set `.env.local` and restart Vite. |
| HTTP 403 | Match `ALLOWED_ORIGINS` to the frontend origin, including scheme/port, excluding `/My-Profile/`. Production allows `https://ablonewolf.github.io`; local overrides belong in `.dev.vars`. |
| HTTP 503 | Add the runtime `TYPERACER_API_KEY` secret; retain the configured `PROFILE_LIMITER` binding. |
| HTTP 502 | Check the key belongs to `arkacsedu`, its API access, and TypeRacer availability. The error deliberately does not echo upstream details. |
| HTTP 429 | Wait before retrying; avoid repeatedly reloading. TypeRacer can enforce a lower limit than the Worker. |
| Worker 200 but frontend fallback | Check the full endpoint URL, HTTPS, allowed origin, and that the latest frontend build includes the variable. |

## Official references

- TypeRacer authentication: https://developers.typeracer.com/authentication.html
- TypeRacer stats fields: https://developers.typeracer.com/entities/RacerStats.html
- Cloudflare runtime secrets: https://developers.cloudflare.com/workers/configuration/secrets/
- Same-repository deployments: https://developers.cloudflare.com/workers/ci-cd/builds/advanced-setups/
- Regional rate limiting: https://developers.cloudflare.com/workers/runtime-apis/bindings/rate-limit/
