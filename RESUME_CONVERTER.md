# Resume to Portfolio Data Converter

This guide helps you extract information from your resume (PDF or other formats) and convert it into the format needed for your portfolio website.

## Manual Extraction Process

Since you have a resume PDF, here's how to extract and structure the data:

### Step 1: Extract Information from Your Resume

Open your resume and identify these sections:
- Contact Information
- Professional Summary/Objective
- Work Experience
- Education
- Skills
- Certifications
- Projects (if available)

### Step 2: Map to Portfolio Format

Use this template to organize your data before adding it to `src/data/index.ts`:

#### Personal Information
```
Name: [From resume header]
Title: [Your current/desired job title]
Email: [From contact section]
Phone: [From contact section]
Location: [From contact section]
Bio: [From summary/objective - keep it concise, 1-2 sentences]
GitHub: [Add your GitHub URL]
LinkedIn: [Add your LinkedIn URL]
Twitter: [Optional]
Website: [Will be your GitHub Pages URL]
```

#### Work Experience
For each job in your resume:
```
Title: [Job title from resume]
Company: [Company name]
Location: [Job location]
Start Date: [Format as YYYY-MM, e.g., 2022-01]
End Date: [Format as YYYY-MM or leave empty for current job]
Description:
  - [Key responsibility or achievement 1]
  - [Key responsibility or achievement 2]
  - [Key responsibility or achievement 3]
Technologies: [List technologies used in this role]
```

#### Skills
Group your skills by category:
```
Frontend: [e.g., React, TypeScript, HTML, CSS]
Backend: [e.g., Node.js, Python, Java]
Database: [e.g., MongoDB, PostgreSQL, MySQL]
DevOps & Tools: [e.g., Git, Docker, AWS]
```

#### Certifications
For each certification:
```
Name: [Full certification name]
Issuer: [Issuing organization]
Issue Date: [Format as YYYY-MM]
Expiry Date: [If applicable, format as YYYY-MM]
Credential URL: [Link to verify certificate]
```

### Step 3: Convert to Code Format

Open `src/data/index.ts` and update each section.

#### Example: Converting Work Experience

**From Resume:**
```
Senior Software Engineer
TechCorp Inc. | San Francisco, CA | Jan 2022 - Present
• Led development of microservices architecture
• Mentored team of 5 junior developers
• Improved system performance by 40%
Technologies: React, Node.js, AWS
```

**To Code:**
```typescript
{
  id: '1',
  title: 'Senior Software Engineer',
  company: 'TechCorp Inc.',
  location: 'San Francisco, CA',
  startDate: '2022-01',
  endDate: undefined, // Current position
  description: [
    'Led development of microservices architecture',
    'Mentored team of 5 junior developers',
    'Improved system performance by 40%',
  ],
  technologies: ['React', 'Node.js', 'AWS'],
}
```

## Automated Extraction Options

If you want to automate the process, you can use these tools:

### Option 1: Online PDF to Text Converters
1. Use tools like [PDF.co](https://pdf.co/) or [Adobe Acrobat Online](https://www.adobe.com/acrobat/online.html)
2. Convert PDF to text
3. Copy and manually structure the data

### Option 2: Resume Parser Services
Services that can parse resumes into structured data:
- [Affinda Resume Parser](https://www.affinda.com/)
- [Sovren Resume Parser](https://sovren.com/)
- [RChilli](https://www.rchilli.com/)

These services typically:
1. Accept PDF upload
2. Extract structured data (JSON/XML)
3. Provide parsed information you can map to your portfolio

### Option 3: Python Script (Technical Users)

If you're comfortable with Python, you can write a script:

```python
# Install required packages:
# pip install PyPDF2 openai

import PyPDF2
import json

def extract_text_from_pdf(pdf_path):
    with open(pdf_path, 'rb') as file:
        pdf_reader = PyPDF2.PdfReader(file)
        text = ''
        for page in pdf_reader.pages:
            text += page.extract_text()
    return text

# Extract text
resume_text = extract_text_from_pdf('your_resume.pdf')

# You can then use ChatGPT API to structure the data
# Or manually organize the extracted text
print(resume_text)
```

### Option 4: Using AI (ChatGPT/Claude)

1. Extract text from your PDF using any PDF reader
2. Copy the text
3. Ask an AI assistant:
   ```
   I have this resume text. Please convert it to the TypeScript format 
   needed for my portfolio. Here's the format [paste types from src/types/index.ts]
   
   Resume text:
   [paste your resume text]
   ```

## Tips for Best Results

1. **Be Selective**: Don't include every job from your resume. Focus on the most relevant 3-5 positions.

2. **Quantify Achievements**: Include numbers and metrics where possible
   - "Improved performance by 40%"
   - "Led team of 5 developers"
   - "Reduced costs by $50K annually"

3. **Use Action Verbs**: Start each bullet point with strong action verbs
   - Led, Developed, Implemented, Managed, Designed, etc.

4. **Keep It Concise**: Each description point should be one line
   - Good: "Led development of microservices architecture serving 1M+ users"
   - Too long: "Was responsible for leading the development efforts related to the microservices architecture that now serves over one million users on a daily basis..."

5. **Highlight Technologies**: Make sure to list relevant technologies for each position

6. **Update Regularly**: Keep your portfolio data in sync with your resume

## Data Quality Checklist

Before finalizing, check:
- [ ] All dates are in YYYY-MM format
- [ ] No spelling or grammar errors
- [ ] All URLs are valid and working
- [ ] Contact information is up-to-date
- [ ] Skills are organized logically
- [ ] Technologies are consistently named
- [ ] Description points are concise and impactful
- [ ] Current position has `endDate: undefined`

## Example Workflow

1. **Open your resume PDF** in a PDF reader
2. **Copy text section by section**:
   - Copy contact info → Paste into template
   - Copy work experience → Format for each job
   - Copy skills → Group by category
   - Copy certifications → Format with dates

3. **Create a temporary text file** with organized data

4. **Open `src/data/index.ts`** in your code editor

5. **Replace placeholder data** with your information

6. **Test locally**: `npm run dev`

7. **Verify everything looks correct**

8. **Commit and push** to deploy

## Need Help?

If you're stuck:
1. Check the example data in `src/data/index.ts`
2. Review the type definitions in `src/types/index.ts`
3. Test with minimal data first, then add more
4. Use the dev server (`npm run dev`) to see changes in real-time

Remember: You can always start with the placeholder data and gradually replace it with your own information!
