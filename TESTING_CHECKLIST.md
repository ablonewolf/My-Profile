# Testing Checklist

Use this checklist to ensure your portfolio website is working correctly before and after deployment.

## Local Testing

### Build & Run Tests
- [ ] `npm install` runs without errors
- [ ] `npm run dev` starts the development server successfully
- [ ] `npm run build` completes without TypeScript or build errors
- [ ] `npm run preview` shows the production build correctly
- [ ] `npm run lint` passes without errors

### Visual Testing (Desktop)
- [ ] Hero section displays name, title, and bio correctly
- [ ] Social media links are visible and correct
- [ ] Navigation menu is visible and functional
- [ ] Smooth scrolling works when clicking navigation items
- [ ] All sections are visible (Hero, About, Skills, Experience, Certifications, Projects, Contact)
- [ ] Skills are grouped and displayed correctly
- [ ] Work experience shows dates and descriptions properly
- [ ] Certifications display with correct information
- [ ] Projects show with technology tags
- [ ] Contact form is visible and formatted correctly
- [ ] Footer is present at the bottom

### Visual Testing (Mobile)
- [ ] Mobile menu icon (hamburger) appears
- [ ] Mobile menu opens and closes correctly
- [ ] All sections are readable on small screens
- [ ] Buttons and links are touch-friendly
- [ ] Hero section scales appropriately
- [ ] Skills grid adapts to single column
- [ ] Experience cards stack properly
- [ ] Projects grid adapts to mobile view
- [ ] Contact form is usable on mobile

### Responsive Testing
Test on these viewport sizes:
- [ ] Mobile (375px width)
- [ ] Tablet (768px width)
- [ ] Desktop (1024px width)
- [ ] Large Desktop (1440px+ width)

### Functionality Testing
- [ ] Navigation scrolls to correct sections
- [ ] Social media links open in new tabs
- [ ] Project GitHub links work
- [ ] Project live demo links work
- [ ] Certification credential links work
- [ ] Email links open mail client
- [ ] Contact form submit triggers email client
- [ ] Header becomes fixed on scroll (with shadow)
- [ ] Hover effects work on buttons and links

### Content Testing
- [ ] No placeholder text remains (like "Your Name", "Your Email")
- [ ] All dates are formatted correctly (MMM YYYY)
- [ ] No spelling or grammar errors
- [ ] Skills are relevant and accurate
- [ ] Project descriptions are clear
- [ ] Technologies listed are correct
- [ ] Contact information is up-to-date

## Deployment Testing

### GitHub Pages
- [ ] GitHub Actions workflow completes successfully
- [ ] Check Actions tab for green checkmarks
- [ ] Site is accessible at `https://ablonewolf.github.io/My-Profile/`
- [ ] All assets load correctly (CSS, JS, images)
- [ ] No 404 errors in browser console
- [ ] Navigation works on live site
- [ ] All links work on live site

### Performance
- [ ] Page loads in under 3 seconds
- [ ] No console errors in browser
- [ ] Images load properly
- [ ] Smooth scrolling performance
- [ ] No layout shift on load

### Cross-Browser Testing
Test on:
- [ ] Chrome/Chromium
- [ ] Firefox
- [ ] Safari (if on Mac)
- [ ] Edge
- [ ] Mobile Safari (iOS)
- [ ] Mobile Chrome (Android)

### SEO & Metadata
- [ ] Page title is descriptive
- [ ] Meta description is present
- [ ] Open Graph tags (optional but recommended)
- [ ] Favicon displays correctly
- [ ] Site is indexable (no robots.txt blocking)

## Accessibility Testing

### Basic Checks
- [ ] All images have alt text
- [ ] Color contrast is sufficient
- [ ] Focus indicators are visible
- [ ] Keyboard navigation works (Tab key)
- [ ] Links have descriptive text
- [ ] Headings are in logical order (H1, H2, H3)
- [ ] Forms have proper labels

### Screen Reader Testing (Optional)
- [ ] Test with NVDA (Windows) or VoiceOver (Mac)
- [ ] Ensure content reads in logical order
- [ ] Navigation is announced properly

## Security Testing

- [ ] No sensitive information in source code
- [ ] No API keys or secrets committed
- [ ] External links have `rel="noopener noreferrer"`
- [ ] HTTPS is enabled (GitHub Pages default)

## Post-Deployment Checklist

After successful deployment:
- [ ] Update LinkedIn with website URL
- [ ] Share on social media
- [ ] Add to resume
- [ ] Submit to search engines (optional)
- [ ] Set up Google Analytics (optional)
- [ ] Monitor GitHub Actions for deployment status

## Regular Maintenance

Every 3-6 months:
- [ ] Update work experience
- [ ] Add new projects
- [ ] Update skills
- [ ] Add new certifications
- [ ] Update technologies versions
- [ ] Check and fix broken links
- [ ] Update dependencies (`npm update`)
- [ ] Test on latest browsers

## Common Issues & Solutions

### Issue: Site shows 404 on GitHub Pages
**Solution:** 
- Check GitHub Pages settings (Settings → Pages → Source: GitHub Actions)
- Verify base path in vite.config.ts matches repository name
- Check GitHub Actions logs for errors

### Issue: CSS not loading
**Solution:**
- Verify base path in vite.config.ts is `/My-Profile/`
- Clear browser cache
- Check network tab for 404 errors

### Issue: Images not displaying
**Solution:**
- Ensure images are in `public/` folder
- Use correct path: `/My-Profile/image.jpg` (with base path)
- Check file extensions match (case-sensitive on some systems)

### Issue: Navigation not working
**Solution:**
- Verify section IDs match navigation links
- Check for JavaScript errors in console
- Test smooth scrolling behavior

### Issue: Mobile menu not opening
**Solution:**
- Check for JavaScript errors
- Verify useState is working
- Test on different devices

## Tools for Testing

### Online Tools
- [PageSpeed Insights](https://pagespeed.web.dev/) - Performance
- [Wave](https://wave.webaim.org/) - Accessibility
- [Mobile-Friendly Test](https://search.google.com/test/mobile-friendly) - Mobile
- [W3C Validator](https://validator.w3.org/) - HTML validation
- [Can I Use](https://caniuse.com/) - Browser compatibility

### Browser Extensions
- Lighthouse (built into Chrome DevTools)
- React Developer Tools
- WAVE Accessibility Tool
- ColorZilla (for color checking)

### Local Tools
```bash
# Build and serve locally
npm run build
npm run preview

# Check for outdated dependencies
npm outdated

# Update dependencies
npm update
```

## Notes

- Test locally before pushing to avoid broken deployments
- Keep this checklist updated as you add features
- Document any custom testing procedures
- Set reminders for regular maintenance checks
