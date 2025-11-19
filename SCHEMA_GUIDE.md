# Resume Data Schema Guide

## 📋 Complete Field Reference

This guide explains every field in your `resume-data.json` file and how to use them.

---

## 🧑 Personal Information

```json
"personal": {
  "name": "Your Full Name",
  "title": "Your Professional Title",
  "email": "your@email.com",
  "phone": "+1 (555) 123-4567",
  "location": "City, State, Country",
  "photo": "photo.jpg",              // Optional: filename of your photo
  "linkedin": "https://linkedin.com/in/yourprofile",
  "github": "https://github.com/yourusername",
  "website": "https://yourwebsite.com",     // Optional
  "portfolio": "https://portfolio.com",      // Optional
  "summary": "Your professional summary..."
}
```

**Tips:**
- `title`: Keep it concise (1-2 lines)
- `summary`: 3-5 sentences highlighting your key strengths
- Use `<strong>` tags in summary for emphasis

---

## 🎓 Education

```json
"education": [
  {
    "degree": "Bachelor of Science in Computer Science",
    "institution": "University Name",
    "location": "City, State, Country",
    "cgpa": "3.8/4.0",                    // Or "GPA: 3.8/4.0"
    "year": "2024",                        // Graduation year
    "startYear": "2020",                   // Optional
    "endYear": "2024",                     // Optional
    "fieldOfStudy": "Computer Science",    // Optional
    "honors": "Magna Cum Laude",           // Optional
    "relevantCoursework": [                // Optional
      "Data Structures",
      "Algorithms",
      "Machine Learning"
    ]
  }
]
```

**Tips:**
- List education in reverse chronological order (most recent first)
- Include honors/awards if applicable
- Add relevant coursework for entry-level positions

---

## 📜 Certifications

```json
"certifications": [
  {
    "name": "AWS Certified Solutions Architect",
    "issuer": "Amazon Web Services",
    "date": "2024",
    "expiryDate": "2027",                  // Optional
    "credentialId": "ABC123XYZ",           // Optional
    "credentialUrl": "https://...",        // Optional
    "description": "Brief description"      // Optional
  }
]
```

**Tips:**
- Include active certifications only
- Add credentialUrl for verification
- List most relevant certifications first

---

## 🌍 Languages

```json
"languages": [
  {
    "language": "English",
    "proficiency": "Native/Bilingual"
  },
  {
    "language": "Spanish",
    "proficiency": "Professional Working"
  }
]
```

**Proficiency Levels:**
- `Native/Bilingual`
- `Professional Working`
- `Limited Working`
- `Elementary`

---

## 💼 Skills

```json
"skills": {
  "Category Name": [
    "Skill 1",
    "Skill 2",
    "Skill 3"
  ],
  "Another Category": [
    "Skill A",
    "Skill B"
  ]
}
```

**Common Categories:**
- Frontend Development
- Backend Development
- Databases
- DevOps & Cloud
- Tools & Technologies
- Soft Skills

**Tips:**
- Group related skills together
- List most proficient skills first
- Use consistent naming (e.g., "React.js" not "React" and "ReactJS")

---

## 💼 Experience

```json
"experience": [
  {
    "company": "Company Name",
    "location": "City, State/Country",
    "position": "Your Job Title",
    "startDate": "Jan 2023",
    "endDate": "Present",                  // Or "Dec 2024"
    "current": true,                        // true if currently working
    "duration": "2 years 3 months",        // Optional, can auto-calculate
    "website": "company.com",              // Optional
    "projects": [...]                      // See Projects below
  }
]
```

### Projects within Experience

**Option 1: Projects with Achievements**
```json
"projects": [
  {
    "name": "Project Name",
    "role": "Your Role",
    "description": "What the project does",
    "achievements": [
      "Built feature X that improved Y by 30%",
      "Led team of 5 developers",
      "Reduced load time by 50%"
    ],
    "techStack": ["React", "Node.js", "PostgreSQL"]
  }
]
```

**Option 2: Projects with Sub-Projects**
```json
"projects": [
  {
    "name": "Enterprise Platform",
    "role": "Senior Developer",
    "description": "Multiple features for client",
    "subProjects": [
      {
        "name": "Feature A",
        "details": [
          "Detail 1",
          "Detail 2"
        ]
      }
    ],
    "techStack": ["Java", "Spring Boot"]
  }
]
```

**Tips:**
- Use action verbs (Built, Led, Improved, Developed)
- Quantify achievements with numbers/percentages
- Keep 3-5 bullet points per project
- Most recent experience first

---

## 🚀 Personal Projects

```json
"projects": [
  {
    "name": "Project Name",
    "description": "Brief description",
    "role": "Solo Developer",             // Or "Team Lead", etc.
    "startDate": "2023",
    "endDate": "2023",                    // Or "Present"
    "url": "https://project.com",         // Optional
    "github": "https://github.com/...",   // Optional
    "highlights": [
      "Achievement 1",
      "Achievement 2"
    ],
    "techStack": ["React", "Firebase"]
  }
]
```

**Tips:**
- Include impressive personal projects
- Add live demo links if available
- Highlight impact or user numbers

---

## 🤝 Volunteer Work

```json
"volunteer": [
  {
    "organization": "Organization Name",
    "role": "Your Role",
    "startDate": "2023",
    "endDate": "Present",
    "current": true,
    "description": "What you did",
    "highlights": [
      "Impact 1",
      "Impact 2"
    ]
  }
]
```

**Tips:**
- Include if relevant to target role
- Highlight leadership and impact

---

## 🏆 Awards & Honors

```json
"awards": [
  {
    "title": "Award Name",
    "issuer": "Issuing Organization",
    "date": "2024",
    "description": "What it was for"
  }
]
```

---

## 📚 Publications

```json
"publications": [
  {
    "title": "Article or Paper Title",
    "publisher": "Where it was published",
    "date": "2024",
    "url": "https://link-to-publication",
    "description": "Brief summary"
  }
]
```

**Types:**
- Research papers
- Blog articles
- Technical documentation
- Books/chapters

---

## 📖 Courses & Training

```json
"courses": [
  {
    "name": "Course Name",
    "provider": "Coursera / Udemy / etc.",
    "date": "2024",
    "url": "https://certificate-link",    // Optional
    "description": "What you learned"      // Optional
  }
]
```

**Tips:**
- Include only relevant courses
- Add certification links if available

---

## 👥 Professional Memberships

```json
"professionalMemberships": [
  {
    "organization": "IEEE Computer Society",
    "role": "Member",
    "startDate": "2023",
    "endDate": "Present",
    "current": true,
    "description": "Your involvement"
  }
]
```

---

## 🎤 Speaking Engagements

```json
"speaking": [
  {
    "title": "Talk Title",
    "event": "Conference or Event Name",
    "location": "City, Country",
    "date": "2024",
    "url": "https://video-or-slides",     // Optional
    "description": "What you spoke about"
  }
]
```

---

## 🔬 Patents

```json
"patents": [
  {
    "title": "Patent Title",
    "patentNumber": "US1234567",
    "status": "Granted",                  // Or "Pending"
    "date": "2024",
    "url": "https://patent-link",         // Optional
    "description": "What it covers"
  }
]
```

---

## 🎯 Interests

```json
"interests": [
  "Open Source Contribution",
  "Machine Learning",
  "Tech Blogging",
  "Competitive Programming"
]
```

**Tips:**
- Keep it professional and relevant
- 4-8 interests is ideal
- Can include hobbies that show personality

---

## 📞 References

```json
"references": [
  {
    "name": "Available upon request",
    "title": "",
    "company": "",
    "email": "",
    "phone": "",
    "relationship": ""
  }
]
```

**Or provide actual references:**
```json
"references": [
  {
    "name": "John Doe",
    "title": "Senior Manager",
    "company": "ABC Corp",
    "email": "john@abc.com",
    "phone": "+1 (555) 123-4567",
    "relationship": "Former Manager"
  }
]
```

---

## 🎯 Key Achievements

```json
"achievements": [
  {
    "title": "Achievement Title",
    "description": "What you achieved"
  }
]
```

**Tips:**
- Keep achievements distinct from experience bullets
- Highlight career milestones
- Include quantifiable results

---

## ⭐ Notable Projects (Summary)

```json
"notableProjects": [
  {
    "name": "Project Name",
    "description": "One-line description",
    "highlight": "Key achievement or metric"
  }
]
```

**Tips:**
- Used in some templates for quick project overview
- Pick 3-5 most impressive projects

---

## 📝 Usage Tips

### What to Include vs. Exclude

**INCLUDE:**
- ✅ Relevant work experience (last 10-15 years)
- ✅ Recent education and certifications
- ✅ Skills you're proficient in
- ✅ Quantifiable achievements
- ✅ Projects with measurable impact

**EXCLUDE:**
- ❌ Irrelevant work experience
- ❌ Outdated skills
- ❌ Personal information (age, marital status, religion)
- ❌ Vague descriptions
- ❌ Skills you can't demonstrate

### Template Behavior

**Smart Rendering:**
- Empty arrays (`[]`) → Section hidden in templates
- Empty strings (`""`) → Field not displayed
- Templates automatically adjust layout based on content

**Examples:**
```json
// This section will be hidden
"certifications": []

// This section will show
"certifications": [{...}]

// This field won't show
"website": ""

// This field will show
"website": "https://example.com"
```

### Customization for Different Jobs

**Tech Job:**
- Emphasize: Technical skills, projects, GitHub
- Include: Certifications, personal projects
- Optional: Awards, speaking

**Corporate Job:**
- Emphasize: Professional experience, achievements
- Include: Education, certifications
- Optional: Interests, hobbies

**Creative Job:**
- Emphasize: Portfolio, projects, design skills
- Include: Awards, publications
- Optional: Interests that show creativity

---

## 🔄 Migration from Old Schema

If you're using the basic schema, here's how to migrate:

1. **Backup your current file:**
   ```bash
   cp resume-data.json resume-data-backup.json
   ```

2. **Copy enhanced schema:**
   ```bash
   cp resume-data-enhanced.json resume-data.json
   ```

3. **Fill in new sections** as needed

4. **Leave empty** sections you don't need:
   ```json
   "certifications": [],
   "volunteer": [],
   "awards": []
   ```

---

## ✅ Validation Checklist

Before finalizing your resume:

- [ ] All dates are formatted consistently (MMM YYYY)
- [ ] Email and phone are valid
- [ ] URLs are working links
- [ ] No spelling/grammar errors
- [ ] Achievement bullets start with action verbs
- [ ] Numbers/percentages included where possible
- [ ] Tech stack names are consistent
- [ ] Most recent experience listed first
- [ ] Empty sections are removed or have `[]`

---

## 🆘 Common Issues

**Issue:** Template shows empty sections
**Fix:** Set section to empty array: `"certifications": []`

**Issue:** Dates not displaying correctly
**Fix:** Use format "MMM YYYY" (e.g., "Jan 2024")

**Issue:** Special characters breaking JSON
**Fix:** Escape quotes: `\"` or use single quotes in text

**Issue:** Tech stack not showing
**Fix:** Ensure `techStack` is array: `["React", "Node.js"]`

---

## 📚 Examples

See `resume-data-enhanced.json` for complete working example with all fields populated.

For quick start, copy sections you need and delete examples.

---

**Need help? Check the other guides:**
- `MODULAR_GUIDE.md` - How to edit and update
- `TEMPLATES_README.md` - Template usage
- `README.md` - System overview
