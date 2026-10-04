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
   for the initial refresh. Subsequent pushes to `main` and weekly Monday refreshes
   at 03:23 UTC (09:23 in Bangladesh) use the same build and deployment workflow.

The secret is scoped only to the refresh step. Never prefix it with `VITE_`,
commit it, or put it into client configuration. `npm run build` and development
work without credentials; `npm run refresh:typeracer` is an explicit server-side
refresh command requiring Node.js 20 or newer.

Only validated average/best/certified WPM, race and win counts, points, username,
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
