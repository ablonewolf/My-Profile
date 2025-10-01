# Customization Guide

This guide will help you customize the portfolio website to match your personal brand and preferences.

## Table of Contents

1. [Updating Personal Information](#updating-personal-information)
2. [Customizing Colors and Theme](#customizing-colors-and-theme)
3. [Adding New Sections](#adding-new-sections)
4. [Modifying Existing Sections](#modifying-existing-sections)
5. [Adding Images and Media](#adding-images-and-media)
6. [Changing Fonts](#changing-fonts)

## Updating Personal Information

### Basic Information

Edit `src/data/index.ts` to update your personal information:

```typescript
export const personalInfo: PersonalInfo = {
  name: 'Your Full Name',
  title: 'Your Professional Title',
  email: 'your.email@example.com',
  phone: '+1 (555) 123-4567',
  location: 'Your City, Country',
  bio: 'Your professional bio/tagline',
  github: 'https://github.com/yourusername',
  linkedin: 'https://www.linkedin.com/in/yourprofile',
  twitter: 'https://twitter.com/yourhandle',
  website: 'https://yourwebsite.com',
};
```

### Work Experience

Add your work experiences:

```typescript
export const experiences: Experience[] = [
  {
    id: '1', // Unique identifier
    title: 'Senior Software Engineer',
    company: 'Tech Company Inc.',
    location: 'San Francisco, CA',
    startDate: '2022-01', // Format: YYYY-MM
    endDate: '2024-01', // Or undefined for current position
    description: [
      'Led development of key features',
      'Mentored junior developers',
      'Improved performance by 40%',
    ],
    technologies: ['React', 'TypeScript', 'Node.js'],
  },
  // Add more experiences...
];
```

### Certifications

Update your certifications:

```typescript
export const certifications: Certification[] = [
  {
    id: '1',
    name: 'AWS Certified Developer',
    issuer: 'Amazon Web Services',
    issueDate: '2023-06',
    expiryDate: '2026-06', // Optional
    credentialId: 'ABC123XYZ', // Optional
    credentialUrl: 'https://verify.aws.com/...',
  },
];
```

### Projects

Showcase your projects:

```typescript
export const projects: Project[] = [
  {
    id: '1',
    title: 'Project Name',
    description: 'Brief description of what the project does',
    image: '/path/to/image.jpg', // Optional
    technologies: ['React', 'Node.js', 'MongoDB'],
    githubUrl: 'https://github.com/yourusername/project',
    liveUrl: 'https://project-demo.com',
  },
];
```

### Skills

Organize your skills by category:

```typescript
export const skills: Skill[] = [
  {
    category: 'Frontend',
    items: ['React', 'TypeScript', 'Tailwind CSS'],
  },
  {
    category: 'Backend',
    items: ['Node.js', 'Python', 'PostgreSQL'],
  },
  // Add more categories...
];
```

## Customizing Colors and Theme

### Using Tailwind CSS

The website uses Tailwind CSS. To customize colors:

1. **Edit `tailwind.config.js`**:

```javascript
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0066CC',
        secondary: '#FF6B35',
        accent: '#F7931E',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
```

2. **Use custom colors in components**:

Replace `bg-blue-600` with `bg-primary`, `text-blue-600` with `text-primary`, etc.

### Changing the Color Scheme

To change from blue to another color:

1. Use VS Code's Find & Replace (Ctrl+Shift+H or Cmd+Shift+H)
2. Find: `blue-600` → Replace with: `purple-600` (or any Tailwind color)
3. Find: `blue-100` → Replace with: `purple-100`
4. Repeat for other blue shades

### Dark Mode

To add dark mode support:

1. **Update `tailwind.config.js`**:

```javascript
export default {
  darkMode: 'class',
  // ... rest of config
}
```

2. **Add dark mode variants to components**:

```tsx
<div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
  {/* Content */}
</div>
```

3. **Create a theme toggle component** (optional)

## Adding New Sections

### Step 1: Create a new section component

Create `src/sections/NewSection.tsx`:

```tsx
const NewSection = () => {
  return (
    <section id="new-section" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
          New Section
        </h2>
        {/* Your content here */}
      </div>
    </section>
  );
};

export default NewSection;
```

### Step 2: Add to App.tsx

```tsx
import NewSection from './sections/NewSection';

function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Certifications />
        <NewSection /> {/* Add here */}
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
```

### Step 3: Add to navigation

Update `src/components/Header.tsx`:

```tsx
const navItems = [
  // ... existing items
  { label: 'New Section', id: 'new-section' },
  // ... more items
];
```

## Modifying Existing Sections

### Changing Section Order

Simply rearrange the order in `App.tsx`:

```tsx
<main>
  <Hero />
  <Projects /> {/* Moved up */}
  <About />
  <Skills />
  {/* ... */}
</main>
```

### Removing a Section

1. Comment out or delete the import in `App.tsx`
2. Remove the component from the JSX
3. Remove from navigation in `Header.tsx`

### Changing Section Background Colors

Alternate between white and gray backgrounds:

```tsx
<section className="py-20 bg-white"> {/* White background */}
<section className="py-20 bg-gray-50"> {/* Light gray background */}
<section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100"> {/* Gradient */}
```

## Adding Images and Media

### Profile Picture

1. Add your image to `public/` folder:
   - `public/profile.jpg`

2. Update Hero section (`src/sections/Hero.tsx`):

```tsx
<div className="text-center">
  <img
    src="/My-Profile/profile.jpg"
    alt={personalInfo.name}
    className="w-48 h-48 rounded-full mx-auto mb-8 shadow-lg object-cover"
  />
  <h1 className="text-5xl md:text-7xl font-bold text-gray-800 mb-4">
    {personalInfo.name}
  </h1>
  {/* ... */}
</div>
```

### Project Images

1. Add images to `public/projects/`:
   - `public/projects/project1.jpg`

2. Update project data:

```typescript
export const projects: Project[] = [
  {
    id: '1',
    title: 'Project Name',
    image: '/My-Profile/projects/project1.jpg',
    // ... rest of project data
  },
];
```

3. Update Projects section to display images:

```tsx
{project.image && (
  <img
    src={project.image}
    alt={project.title}
    className="h-48 w-full object-cover"
  />
)}
```

### Background Images

Add a background to sections:

```tsx
<section
  className="py-20"
  style={{
    backgroundImage: 'url(/My-Profile/background.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }}
>
  <div className="bg-white bg-opacity-90">
    {/* Content */}
  </div>
</section>
```

## Changing Fonts

### Using Google Fonts

1. **Add to `index.html`**:

```html
<head>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
</head>
```

2. **Update `tailwind.config.js`**:

```javascript
theme: {
  extend: {
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
      heading: ['Poppins', 'sans-serif'],
    },
  },
},
```

3. **Use in components**:

```tsx
<h1 className="font-heading text-5xl">Heading</h1>
<p className="font-sans">Body text</p>
```

## Advanced Customization

### Adding Animations

Install framer-motion:

```bash
npm install framer-motion
```

Use in components:

```tsx
import { motion } from 'framer-motion';

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  {/* Content */}
</motion.div>
```

### Custom Tailwind Utilities

Add custom utilities in `src/index.css`:

```css
@import "tailwindcss";

@layer components {
  .btn-primary {
    @apply px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300;
  }
  
  .section-title {
    @apply text-4xl font-bold text-center text-gray-800 mb-12;
  }
}
```

Use in components:

```tsx
<button className="btn-primary">Click me</button>
<h2 className="section-title">Section Title</h2>
```

## Tips

1. **Always test locally** after making changes: `npm run dev`
2. **Build before committing** to catch errors: `npm run build`
3. **Use responsive classes**: `text-sm md:text-base lg:text-lg`
4. **Keep consistent spacing**: Use Tailwind's spacing scale (4, 8, 12, 16, etc.)
5. **Maintain accessibility**: Use semantic HTML and proper ARIA labels

## Need Help?

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Documentation](https://react.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
