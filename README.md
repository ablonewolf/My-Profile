# My Portfolio Website

A modern, responsive personal portfolio website built with React, TypeScript, and Tailwind CSS.

## Features 

- 🎨 Modern and clean design
- 📱 Fully responsive (mobile, tablet, desktop)
- ⚡ Fast and optimized with Vite
- 🎯 TypeScript for type safety
- 💅 Styled with Tailwind CSS

## Sections

- **Hero**: Introduction and social links
- **About**: Personal information and contact details
- **Skills**: Technical skills organized by category
- **Experience**: Work history and professional experience
- **Certifications**: Professional certifications and credentials
- **Projects**: Portfolio of projects with links
- **Contact**: Contact form and information

## Tech Stack
 
- **Framework**: React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Icons**: React Icons

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/ablonewolf/ablonewolf.github.io.git
    cd ablonewolf.github.io
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the development server:
    ```bash
    npm run dev
    ```

The site will be available at `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
ablonewolf.github.io/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions CI/CD
├── public/                     # Static assets
├── src/
│   ├── components/            # Reusable components
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   ├── sections/              # Page sections
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Skills.tsx
│   │   ├── Experience.tsx
│   │   ├── Certifications.tsx
│   │   ├── Projects.tsx
│   │   └── Contact.tsx
│   ├── data/                  # Data and content
│   │   └── index.ts
│   ├── types/                 # TypeScript types
│   │   └── index.ts
│   ├── App.tsx                # Main app component
│   ├── main.tsx               # Entry point
│   └── index.css              # Global styles
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── tailwind.config.js

```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Contributing

Feel free to fork this repository and customize it for your own use!

## License

MIT License - feel free to use this project for your personal portfolio.
## TypeRacer profile statistics

The About panel uses a public snapshot for `arkacsedu` in the `play` universe.
It never calls the authenticated API from the browser. GitHub Pages hosting,
`/My-Profile/` URLs, and existing SEO metadata remain unchanged.

### Configure authenticated refreshes

1. Sign in to TypeRacer as `arkacsedu`. Open **Edit Profile → Manage Your API Keys**
   and create an API key. See https://developers.typeracer.com/authentication.html.
2. In this repository, open **Settings → Secrets and variables → Actions → New
   repository secret**. Name it **`TYPERACER_API_KEY`** and set its value to the
   API key alone (not the username, Base64 value, or `Basic` header).
3. After merging, run **Deploy to GitHub Pages** manually from the Actions tab
   for the initial refresh. Subsequent pushes to `main` and scheduled refreshes
   every 15 minutes (at minutes 07, 22, 37, and 52 each hour) use the same build and deployment workflow.

The secret is scoped only to the refresh step. Never prefix it with `VITE_`,
commit it, or put it into client configuration. `npm run build` and development
work without credentials; `npm run refresh:typeracer` is an explicit server-side
refresh command requiring Node.js 20 or newer.

Only validated current/average/best/certified WPM, race and win counts, points, username,
and refresh time enter `src/data/typeracer.json`. Raw API responses and credentials
are neither saved nor logged. The workflow caches only this public JSON after a
successful build. On missing credentials, HTTP errors, timeout, or invalid API
data, the existing snapshot is retained and the portfolio can still deploy.
The panel displays the snapshot date so older statistics are visible as such.
Caches may expire or be evicted; without a retained snapshot, the initial empty
snapshot displays an unavailable message and the profile link, never invented
scores. A later successful refresh restores statistics automatically.

Validation: `npm test`, `npm run lint`, and `npm run build`. Tests use mocked
responses; they do not require a real key or contact TypeRacer.

### Current speed and automatic updates

**Current WPM** is the arithmetic mean of the last 10 race speeds in the `play`
universe, requested with `n=10`. It is displayed first with the note “Average of
last 10 races.” Certified WPM remains a separate statistic. If fewer than 10
results are available, or a result has no speed, Current WPM displays a dash.
The API provides this endpoint for races within the last year.

The raw JavaScript refresh script publishes an allowlisted snapshot to both
`src/data/typeracer.json` and `public/typeracer-profile.json`. It never publishes
race histories or keylogs. If either API request fails or contains invalid data,
the previous snapshot is retained. Each scheduled run rebuilds and deploys the
existing GitHub Pages site. No backend hosting or additional framework is needed.

The browser checks `typeracer-profile.json` immediately and every minute while
visible, and again when the tab becomes visible. Successful updates appear
without reloading the page. Failed checks retain the displayed values. These
are scheduled snapshots, not live updates after each race: Actions queues,
deployment time, and browser polling add delay. GitHub can delay scheduled runs,
and disables schedules in public repositories after 60 days of inactivity.

### Test locally

`npm ci`, `npm test`, `npm run lint`, and `npm run build` need no API secret.
To test an authenticated refresh, enter the same TypeRacer API key in a hidden
terminal prompt (Bash):

```bash
(
  read -r -s -p 'TypeRacer API key: ' TYPERACER_API_KEY
  printf '\n'
  export TYPERACER_API_KEY
  npm run refresh:typeracer
)
npm run dev
```

The subshell discards the environment variable afterward. Open the local URL
shown by Vite and inspect the About panel. Only generated public statistics
are written; never put the key into a file, Vite variable, or command argument.
Do not commit local generated statistics unless deliberately updating the seed.

After merging this change, open Actions → Deploy to GitHub Pages → Run workflow
and select `main`. Confirm it succeeds and check
`https://ablonewolf.github.io/My-Profile/typeracer-profile.json` for populated
statistics and a recent `updatedAt`. Your existing `TYPERACER_API_KEY` repository
secret is sufficient; no Cloudflare account or configuration is required.

## Personal favicon

The portfolio uses a blue **AB** monogram for Arka Bhuiyan. SVG, PNG (48 and
192 pixels), multi-size ICO, and Apple touch icons are provided in `public/`.
HTML links use Vite's base URL so they work at `/My-Profile/`. The default Vite
icon is removed. To regenerate raster assets after editing the monogram, run
`scripts/generate-favicons.py` with Python and Pillow; normal builds need neither.

Search engines choose and cache their own result icons; displaying one is not
guaranteed immediately after deployment. Google supports one favicon per
hostname and expects its declaration on the hostname homepage. At the time of
this change `https://ablonewolf.github.io/` returns 404. This project deployment
cannot publish files at that root URL. To enable hostname-level discovery,
serve a homepage from the separate `ablonewolf.github.io` user-site repository
(or update it if it already exists), and add this to its `<head>`:

```html
<link rel="icon" type="image/png" sizes="192x192"
      href="https://ablonewolf.github.io/My-Profile/favicon-192.png">
```

It can be a simple homepage linking to this portfolio. Keep the portfolio URL
unchanged. Optionally copy this project's `public/favicon.ico` into the user-site
repository root for tools that request `/favicon.ico`. Ensure both the root
homepage and icon return HTTP 200 and are crawlable. Request recrawling of the
homepage through Search Console/Bing Webmaster Tools once published. Google
notes that recrawling can take days to weeks; DuckDuckGo controls its own cache.
See https://developers.google.com/search/docs/appearance/favicon-in-search.
