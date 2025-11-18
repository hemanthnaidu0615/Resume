# Hemanth Naidu - Professional Resume (Multi-Template System)

This repository contains a **fully modular, data-driven resume system** with **6 professional templates** that makes creating and maintaining your resume incredibly easy!

## 🎉 What's Special?

- **🎨 6 Professional Templates** - Switch between styles instantly
- **📝 Edit via JSON or Forms** - Choose your preferred method
- **🔄 Fully Modular** - Data separated from presentation
- **🎯 Industry-Specific Designs** - Templates for tech, corporate, creative, executive
- **📱 Fully Responsive** - All templates work on all devices
- **🖨️ Print-Friendly** - Perfect PDF exports from any template
- **⚡ No Build Process** - Just edit and refresh!
- **🔀 Easy Switching** - Change templates without losing data

## 🎨 Available Templates

1. **Professional Gradient** (`index.html`) - Modern, tech-focused
2. **Minimal Clean** - ATS-friendly, universal
3. **Modern Bold** - Creative, standout design
4. **Classic Traditional** - Executive, formal
5. **Compact One-Page** - Perfect for job fairs
6. **Two-Column Modern** - Unique sidebar layout

**View all templates:** Open `templates.html` in your browser!

## 📁 Key Files

| File | Purpose |
|------|---------|
| `templates.html` | **Template gallery - choose your style!** |
| `customize.html` | Live template customizer & preview |
| `index.html` | Your current resume (Professional Gradient) |
| `admin.html` | Admin interface to edit your resume data |
| `resume-data.json` | **ALL your resume data (edit this!)** |
| `templates/` | Folder with all template HTML files |
| `TEMPLATES_README.md` | Complete template system guide |
| `MODULAR_GUIDE.md` | Guide on using the modular data system |
| `INTERNAL_DOCUMENTATION.md` | Detailed work history documentation |

## 🚀 Quick Start

### 1. Browse Templates
Open `templates.html` to see all 6 professional templates with live previews!

### 2. View Your Resume
Open `index.html` (or any template) in your browser to see your resume!

### 3. Customize & Preview
Open `customize.html` for live template preview and quick switching!

### 4. Update Your Resume

#### Method 1: Use the Admin Interface (Recommended)
1. Open `admin.html` in your browser
2. Choose a tab:
   - **JSON Editor**: Edit the entire JSON directly
   - **Quick Add**: Use simple forms to add companies, projects, skills
3. Make your changes and download the updated file
4. Replace `resume-data.json` with the downloaded file
5. Refresh `index.html` to see changes!

#### Method 2: Edit JSON Directly
1. Open `resume-data.json` in any text editor
2. Make your changes
3. Save and refresh `index.html`

## 📖 Common Tasks

### Add a New Company
```json
{
  "company": "Company Name",
  "location": "City, Country",
  "position": "Your Position",
  "startDate": "Mar 2024",
  "endDate": "Present",
  "projects": []
}
```

Add this to the `experience` array in `resume-data.json`, or use the admin interface!

### Add a Project to Company
```json
{
  "name": "Project Name",
  "role": "Your Role",
  "description": "What you built...",
  "achievements": [
    "Achievement 1",
    "Achievement 2"
  ],
  "techStack": ["Tech1", "Tech2", "Tech3"]
}
```

Add this to the `projects` array of any company!

### Add a New Skill
Just add it to the appropriate category in the `skills` object:

```json
{
  "skills": {
    "Frontend Development": [
      "React.js",
      "Your New Skill Here"
    ]
  }
}
```

## 🎨 Features

### Dynamic Generation
- Resume automatically generated from JSON data
- No manual HTML editing required
- Change data once, update everywhere

### Easy Updates
- **Admin Interface**: User-friendly forms for non-technical edits
- **JSON Editor**: Direct data editing with validation
- **Quick Add Tools**: Fast forms for common tasks

### Professional Design
- Modern gradient header
- Timeline-style work experience
- Categorized skill badges with colors
- Hover effects and animations
- Print-optimized CSS

### Responsive & Accessible
- Mobile-first design
- Works on all screen sizes
- Keyboard shortcuts (Ctrl+P to print)
- Semantic HTML

## 📤 Export to PDF

1. Open `index.html` in your browser
2. Press `Ctrl+P` (Windows/Linux) or `Cmd+P` (Mac)
3. Choose "Save as PDF"
4. Adjust settings (remove headers/footers)
5. Save!

## 🔧 Tech Stack

- **HTML5** - Structure
- **Tailwind CSS** (CDN) - Styling
- **Vanilla JavaScript** - Dynamic rendering
- **JSON** - Data storage

## 📖 Documentation

For complete documentation on using the modular system, see **[MODULAR_GUIDE.md](MODULAR_GUIDE.md)**

Topics covered:
- Complete JSON structure reference
- Step-by-step tutorials for all tasks
- Troubleshooting guide
- Best practices
- Advanced customization

## 🎯 Use Cases

### Keep Multiple Versions
```bash
resume-data-fullstack.json
resume-data-frontend.json
resume-data-backend.json
```

Just rename the one you need to `resume-data.json`!

### Version Control
```bash
git add resume-data.json
git commit -m "Added new project"
git push
```

### Host Online
- Upload to GitHub Pages
- Deploy to Netlify/Vercel
- Add to personal website

## 🆘 Troubleshooting

**Resume not loading?**
- Make sure `resume-data.json` is in the same folder as `index.html`
- Check browser console (F12) for errors

**Changes not showing?**
- Hard refresh: `Ctrl+Shift+R` or `Cmd+Shift+R`
- Clear browser cache

**JSON errors?**
- Use "Format JSON" button in admin interface
- Validate at [jsonlint.com](https://jsonlint.com)

See [MODULAR_GUIDE.md](MODULAR_GUIDE.md) for more help!

## 🎉 Benefits of This System

1. **Separation of Concerns** - Data vs. Presentation
2. **Easy Maintenance** - Update data, not HTML
3. **No Technical Skills Required** - Use admin interface
4. **Version Control Friendly** - Small JSON changes
5. **Portable** - Works anywhere, no dependencies
6. **Extendable** - Easy to add new features

## 📞 Contact

- **Email**: hemanthnaidu0615@gmail.com
- **Location**: Hyderabad, Telangana, India

---

## 🔄 Update Workflow

```
Edit resume-data.json
        ↓
Open admin.html (optional)
        ↓
Make changes
        ↓
Save/Download
        ↓
View index.html
        ↓
Export to PDF
        ↓
Done! 🎉
```

---

**Built with ❤️ using HTML, CSS, Tailwind, and JavaScript**

**Last Updated**: November 2024

---

## 🎓 Learning Resources

This modular resume system demonstrates:
- Data-driven web development
- JSON data structures
- DOM manipulation
- Responsive design
- Progressive enhancement

Feel free to fork and customize for your own use!
