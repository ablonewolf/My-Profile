# Quick Start Guide

Welcome! This guide will help you get your portfolio website up and running in minutes.

## Step 1: Update Your Information (5 minutes)

Open `src/data/index.ts` and update:

### Personal Info (Required)
```typescript
export const personalInfo: PersonalInfo = {
  name: 'Your Full Name',           // ← Change this
  title: 'Your Job Title',          // ← Change this
  email: 'your@email.com',          // ← Change this
  phone: '+1 (555) 123-4567',       // ← Change this (optional)
  location: 'Your City, Country',   // ← Change this
  bio: 'Your professional bio',     // ← Change this
  github: 'https://github.com/...',       // ← Update your links
  linkedin: 'https://linkedin.com/...',   // ← Update your links
  twitter: 'https://twitter.com/...',     // ← Update your links (optional)
  website: 'https://yoursite.com',        // ← Update your links (optional)
};
```

### Work Experience
- Update with your actual work history
- Add more entries by copying the format
- Use `endDate: undefined` for current positions

### Certifications
- Add your actual certifications
- Include credential URLs from LinkedIn if available

### Projects
- Add your best 3-6 projects
- Include GitHub and live demo links

### Skills
- List your technical skills by category
- Be honest - only include skills you're comfortable with

## Step 2: Test Locally (2 minutes)

```bash
# Install dependencies (first time only)
npm install

# Start development server
npm run dev
```

Visit http://localhost:5173/My-Profile/ to see your site!

## Step 3: Deploy (1 minute)

```bash
# Commit your changes
git add .
git commit -m "Update portfolio with my information"
git push origin main
```

Your site will automatically deploy to GitHub Pages in 2-3 minutes!

Visit: `https://ablonewolf.github.io/My-Profile/`

## Step 4: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click "Settings" → "Pages"
3. Under "Source", select "GitHub Actions"
4. Wait for the deployment to complete

## Optional Customizations

### Change Colors
See [CUSTOMIZATION.md](CUSTOMIZATION.md#customizing-colors-and-theme) for details.

Quick tip: Search and replace `blue-600` with your preferred color like `purple-600`, `green-600`, etc.

### Add Your Photo
1. Add your photo to `public/` folder as `profile.jpg`
2. Follow instructions in [CUSTOMIZATION.md](CUSTOMIZATION.md#profile-picture)

### Change Sections Order
Edit `src/App.tsx` and rearrange the section components.

## Common Issues

### Build Fails
- Check for TypeScript errors
- Make sure all required fields in data are filled
- Run `npm run build` locally to test

### Site Not Updating
- Check GitHub Actions tab for deployment status
- Ensure GitHub Pages is enabled
- Clear browser cache

### Images Not Showing
- Make sure images are in `public/` folder
- Use paths like `/My-Profile/image.jpg`
- Include the `/My-Profile/` prefix (base path)

## Next Steps

1. ⭐ Star this repository if you find it useful!
2. 📝 Customize further using [CUSTOMIZATION.md](CUSTOMIZATION.md)
3. 🔗 Set up LinkedIn integration using [LINKEDIN_INTEGRATION.md](LINKEDIN_INTEGRATION.md)
4. 🚀 Share your portfolio with the world!

## Need Help?

- Read the full [README.md](README.md)
- Check [CUSTOMIZATION.md](CUSTOMIZATION.md) for styling options
- Review [LINKEDIN_INTEGRATION.md](LINKEDIN_INTEGRATION.md) for syncing data

Happy coding! 🎉
