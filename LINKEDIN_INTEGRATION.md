# LinkedIn Integration Guide

This guide explains how to integrate your LinkedIn profile data into your portfolio website to automatically sync certifications and work experience.

## Overview

The portfolio is designed with LinkedIn integration in mind. The Experience and Certifications sections include placeholder notes indicating where LinkedIn data will be synced.

## LinkedIn API Integration Options

### Option 1: LinkedIn API (Official)

LinkedIn provides official APIs, but access is restricted and requires approval.

1. **Create a LinkedIn App**:
   - Go to [LinkedIn Developers](https://www.linkedin.com/developers/)
   - Create a new app
   - Request access to the necessary APIs

2. **Required APIs**:
   - Profile API (for basic profile information)
   - You'll need to apply for access to retrieve certifications and experience

3. **Implementation**:
   ```typescript
   // Example: Fetching LinkedIn data
   const fetchLinkedInData = async (accessToken: string) => {
     const response = await fetch('https://api.linkedin.com/v2/me', {
       headers: {
         'Authorization': `Bearer ${accessToken}`,
       },
     });
     return response.json();
   };
   ```

**Note**: LinkedIn API access is limited and requires business justification.

### Option 2: LinkedIn Profile Badge/Widget

LinkedIn offers embeddable profile badges that display your current information:

1. Go to [LinkedIn Profile Badge Builder](https://www.linkedin.com/badges/)
2. Create your badge
3. Copy the embed code
4. Add to your website

Example integration in React:
```tsx
<div dangerouslySetInnerHTML={{
  __html: `<script src="https://platform.linkedin.com/badges/js/profile.js" async defer type="text/javascript"></script>
  <div class="badge-base LI-profile-badge" data-locale="en_US" data-size="medium" data-theme="light" data-type="VERTICAL" data-vanity="your-linkedin-username" data-version="v1"><a class="badge-base__link LI-simple-link" href="https://www.linkedin.com/in/your-linkedin-username/">LinkedIn Profile</a></div>`
}} />
```

### Option 3: Manual Data Update

The simplest approach is to manually update your data in `src/data/index.ts` whenever your LinkedIn profile changes.

1. Update your LinkedIn profile
2. Copy the updated information
3. Edit `src/data/index.ts` with the new data
4. Commit and push changes
5. GitHub Actions will automatically deploy the updates

### Option 4: Third-Party Services

Several third-party services provide LinkedIn data integration:

1. **Resume Parser Services**:
   - Services like [Affinda](https://www.affinda.com/), [Sovren](https://sovren.com/)
   - Can parse LinkedIn profiles and export as JSON

2. **Zapier/IFTTT**:
   - Create automated workflows to sync LinkedIn updates
   - Requires manual setup and may have limitations

## Recommended Approach

For a personal portfolio, we recommend a hybrid approach:

1. **Use the manual update method** initially (simplest and most reliable)
2. **Add LinkedIn badge** for live profile visibility
3. **Consider API integration** only if you have frequent updates and API access

## Implementation Steps for Manual Updates

1. **Export Your LinkedIn Data**:
   - Go to LinkedIn Settings & Privacy
   - Navigate to "Data Privacy"
   - Request a copy of your data
   - LinkedIn will email you an archive

2. **Extract Relevant Information**:
   - Extract certifications, work experience, skills
   - Format according to the types in `src/types/index.ts`

3. **Update Data File**:
   ```typescript
   // src/data/index.ts
   export const experiences: Experience[] = [
     {
       id: '1',
       title: 'Your Job Title',
       company: 'Company Name',
       location: 'Location',
       startDate: '2022-01',
       endDate: undefined, // Use undefined for current position
       description: [
         'Your responsibilities',
         'Your achievements',
       ],
       technologies: ['React', 'TypeScript'],
     },
     // ... more experiences
   ];

   export const certifications: Certification[] = [
     {
       id: '1',
       name: 'Certification Name',
       issuer: 'Issuing Organization',
       issueDate: '2023-06',
       credentialUrl: 'https://www.linkedin.com/...',
     },
     // ... more certifications
   ];
   ```

4. **Commit and Deploy**:
   ```bash
   git add src/data/index.ts
   git commit -m "Update experience and certifications from LinkedIn"
   git push
   ```

## Automation Ideas

### GitHub Actions Workflow (Advanced)

You could create a GitHub Actions workflow that periodically checks for updates:

```yaml
name: Update LinkedIn Data

on:
  schedule:
    - cron: '0 0 * * 0' # Weekly on Sunday
  workflow_dispatch: # Manual trigger

jobs:
  update:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Update LinkedIn Data
        run: |
          # Your script to fetch and update data
          # This requires LinkedIn API access or a service
      - name: Commit changes
        run: |
          git config --global user.name 'github-actions[bot]'
          git config --global user.email 'github-actions[bot]@users.noreply.github.com'
          git add src/data/index.ts
          git commit -m "Auto-update: LinkedIn data sync"
          git push
```

## Best Practices

1. **Keep API Keys Secure**: Never commit API keys or tokens to the repository
2. **Use Environment Variables**: Store sensitive data in GitHub Secrets
3. **Regular Updates**: Update your portfolio whenever you update LinkedIn
4. **Validate Data**: Ensure data format matches your TypeScript types
5. **Test Locally**: Always test changes locally before pushing

## Resources

- [LinkedIn Developers](https://www.linkedin.com/developers/)
- [LinkedIn API Documentation](https://learn.microsoft.com/en-us/linkedin/)
- [LinkedIn Profile Badge](https://www.linkedin.com/badges/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

## Support

For questions or issues with LinkedIn integration:
1. Check LinkedIn's developer documentation
2. Review the data types in `src/types/index.ts`
3. Ensure your data format matches the expected structure
