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

The native About panel fetches the current `arkacsedu` statistics from a plain
JavaScript Cloudflare Worker on each page load. The backend lives in `backend/`
in this same repository and uses built-in Web APIs without a framework.
The React portfolio remains on GitHub Pages at `/My-Profile/`.

**Follow [the full setup and local testing guide](backend/README.md)** to deploy
the Worker, configure its private TypeRacer secret, and set the public endpoint
URL in GitHub Actions. Until that URL is configured, the panel displays the
build-time snapshot. API failures retain the snapshot with an explicit status
message and its date/time. The weekly Pages refresh maintains this fallback.

The GitHub Actions repository secret `TYPERACER_API_KEY` remains scoped to the
build-time fallback refresh. Cloudflare needs its own runtime secret with the
same name. Neither credential enters Vite or the browser. Only the public
endpoint URL uses the `VITE_TYPERACER_API_URL` variable.

Validation: `npm test`, `npm run lint`, `npm run build`, and
`npm --prefix backend run check` (install backend tooling first). Tests mock the
API and require no credentials. The pull-request check workflow also packages
the Worker without deploying it.
