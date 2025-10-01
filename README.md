# My Portfolio Website

A modern, responsive personal portfolio website built with React, TypeScript, and Tailwind CSS.

> **🚀 Quick Start**: New to this project? Check out the [QUICKSTART.md](QUICKSTART.md) guide to get up and running in minutes!

## Features

- 🎨 Modern and clean design
- 📱 Fully responsive (mobile, tablet, desktop)
- ⚡ Fast and optimized with Vite
- 🎯 TypeScript for type safety
- 💅 Styled with Tailwind CSS
- 🚀 Automated deployment to GitHub Pages
- 🔄 LinkedIn integration ready for certifications and work experience

## Sections

- **Hero**: Introduction and social links
- **About**: Personal information and contact details
- **Skills**: Technical skills organized by category
- **Experience**: Work history and professional experience
- **Certifications**: Professional certifications and credentials
- **Projects**: Portfolio of projects with links
- **Contact**: Contact form and information

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/ablonewolf/My-Profile.git
cd My-Profile
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

## Customization

### Update Personal Information

Edit the file `src/data/index.ts` to update:
- Personal information (name, title, email, etc.)
- Work experience
- Certifications
- Projects
- Skills

For detailed customization instructions, see [CUSTOMIZATION.md](CUSTOMIZATION.md)

### LinkedIn Integration

The certifications and work experience sections are designed to integrate with LinkedIn. 

For detailed LinkedIn integration instructions, see [LINKEDIN_INTEGRATION.md](LINKEDIN_INTEGRATION.md)

**Quick Summary:**
- **Manual Updates**: Edit `src/data/index.ts` with your latest LinkedIn information
- **LinkedIn Badge**: Embed LinkedIn profile badges for live updates
- **API Integration**: Use LinkedIn API for automated syncing (requires API access)

Note: LinkedIn API access requires approval and proper authentication setup.

## Deployment

### GitHub Pages (Recommended)

This project is configured to automatically deploy to GitHub Pages on every push to the main branch.

1. Go to your repository settings
2. Navigate to Pages section
3. Set Source to "GitHub Actions"
4. Push your changes to the main branch
5. The site will be available at `https://ablonewolf.github.io/My-Profile/`

### Alternative: Manual GitHub Pages Deployment

```bash
npm run build
# Deploy the dist folder to gh-pages branch
```

### Heroku Deployment

To deploy to Heroku:

1. Create a `static.json` file in the root:
```json
{
  "root": "dist",
  "clean_urls": true,
  "routes": {
    "/**": "index.html"
  }
}
```

2. Add a build script to package.json (already included)

3. Deploy:
```bash
heroku create your-app-name
git push heroku main
```

## Tech Stack

- **Framework**: React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Icons**: React Icons
- **Deployment**: GitHub Pages / Heroku

## Project Structure

```
My-Profile/
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
│   ├── main.tsx              # Entry point
│   └── index.css             # Global styles
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

