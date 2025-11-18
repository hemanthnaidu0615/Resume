# Resume Templates System

## 🎨 Multiple Professional Templates, One Data Source

All templates read from the same `resume-data.json` file. Switch templates anytime without losing your data!

---

## 📋 Available Templates

### 1. Professional Gradient (Current - `index.html`)
- **Style**: Modern with gradient colors
- **Best for**: Tech roles, creative industries, startups
- **Colors**: Indigo & Purple gradient
- **ATS-Friendly**: Medium
- **Pages**: 2-3
- **Photo Support**: ✅ (variant available)

### 2. Minimal Clean (`templates/minimal-clean.html`)
- **Style**: Black & white, simple, professional
- **Best for**: All industries, conservative roles
- **Colors**: Black, white, gray
- **ATS-Friendly**: ✅ High
- **Pages**: 2-3
- **Photo Support**: ✅ (variant available)

### 3. Modern Bold (`templates/modern-bold.html`)
- **Style**: Bold colors, unique layout
- **Best for**: Design, creative, startup roles
- **Colors**: Cyan & Blue
- **ATS-Friendly**: ⚠️ Low
- **Pages**: 2-3
- **Photo Support**: ✅ (variant available)

### 4. Classic Traditional (`templates/classic-traditional.html`)
- **Style**: Serif fonts, formal, timeless
- **Best for**: Executive, legal, academic positions
- **Colors**: Slate & charcoal
- **ATS-Friendly**: ✅ High
- **Pages**: 2-3
- **Photo Support**: ✅ (variant available)

### 5. Compact One-Page (`templates/compact-onepage.html`)
- **Style**: Dense layout, space-efficient
- **Best for**: Job fairs, quick reviews, early career
- **Colors**: Emerald & Teal
- **ATS-Friendly**: ✅ High
- **Pages**: 1
- **Photo Support**: ✅ (variant available)

### 6. Two-Column Modern (`templates/twocolumn-modern.html`)
- **Style**: Sidebar layout, modern design
- **Best for**: Tech, modern companies
- **Colors**: Rose & Pink
- **ATS-Friendly**: ⚠️ Medium
- **Pages**: 2
- **Photo Support**: ✅ (variant available)

---

## 🚀 How to Use

### View All Templates
1. Open `templates.html` in your browser
2. Browse all available templates with previews
3. Click "View" on any template to see your resume in that style

### Switch Templates
1. Choose your preferred template
2. Click to view it
3. If you like it, set it as your default by:
   - Renaming the template file to `index.html`, OR
   - Sharing that specific template link

### With or Without Photo?
Most templates have two versions:
- **Standard**: No photo (e.g., `minimal-clean.html`)
- **Photo version**: Includes photo (e.g., `minimal-clean-photo.html`)

To add your photo:
1. Add a photo file named `photo.jpg` to the resume folder
2. Or update `resume-data.json` → `personal.photo` to your photo filename
3. Use the photo version of any template

---

## 📸 Photo Support

### Adding Your Photo
1. Place your photo in the resume folder
2. Name it `photo.jpg` (or update `resume-data.json`)
3. Use photo variants of templates:
   - `templates/minimal-clean-photo.html`
   - `templates/professional-gradient-photo.html`
   - etc.

### Photo Guidelines
- **Size**: 400x400px to 800x800px recommended
- **Format**: JPG, PNG
- **Style**: Professional headshot
- **Background**: Plain or blurred

### When to Use Photos
- ✅ **Use photos for**: European markets, creative roles, personal branding
- ❌ **Avoid photos for**: US corporate roles (ATS issues), some conservative industries

---

## 🎯 Template Selection Guide

### By Industry

**Tech/Software**
- Professional Gradient ⭐
- Minimal Clean
- Two-Column Modern

**Creative/Design**
- Modern Bold ⭐
- Professional Gradient
- Two-Column Modern

**Corporate/Finance**
- Minimal Clean ⭐
- Classic Traditional
- Compact One-Page

**Executive/Legal**
- Classic Traditional ⭐
- Minimal Clean

**Startup/Modern**
- Modern Bold ⭐
- Professional Gradient
- Two-Column Modern

**Early Career/Entry-Level**
- Compact One-Page ⭐
- Minimal Clean

### By Use Case

**Applying Online (ATS)**
- Minimal Clean ⭐⭐⭐
- Classic Traditional ⭐⭐⭐
- Compact One-Page ⭐⭐

**Networking Events**
- Compact One-Page ⭐⭐⭐
- Professional Gradient ⭐⭐

**Portfolio/Personal Website**
- Modern Bold ⭐⭐⭐
- Professional Gradient ⭐⭐⭐

**Email/Direct Applications**
- All templates work! Choose based on industry

**Job Fairs**
- Compact One-Page ⭐⭐⭐

---

## 🛠️ Customization

### Change Colors
Each template file contains color definitions. To customize:

1. Open the template HTML file
2. Find the color variables (usually in `<style>` section)
3. Update hex color codes
4. Save and refresh

Example (Minimal Clean):
```css
/* Find and change */
border: 3px solid #000; /* Change #000 to your color */
```

### Modify Layout
1. Open template HTML file
2. Find the section you want to modify
3. Adjust CSS or HTML structure
4. Save and test

### Create New Template
1. Copy an existing template file
2. Rename it (e.g., `my-custom-template.html`)
3. Modify colors, fonts, layout
4. Add to `templates.html` for easy access

---

## 📊 Template Comparison

| Template | Photo | ATS | Best For | Pages | Unique Feature |
|----------|-------|-----|----------|-------|----------------|
| Professional Gradient | ✅ | ⚠️ | Tech | 2-3 | Gradient header |
| Minimal Clean | ✅ | ✅ | All | 2-3 | Maximum simplicity |
| Modern Bold | ✅ | ⚠️ | Creative | 2-3 | Bold colors |
| Classic Traditional | ✅ | ✅ | Executive | 2-3 | Serif fonts |
| Compact One-Page | ✅ | ✅ | Job fairs | 1 | Fits on one page |
| Two-Column Modern | ✅ | ⚠️ | Tech | 2 | Sidebar layout |

**Legend:**
- ✅ = High/Yes
- ⚠️ = Medium/Conditional
- ❌ = Low/No

---

## 🖨️ Exporting to PDF

All templates are print-optimized!

### Steps:
1. Open any template in your browser
2. Press `Ctrl+P` (Windows/Linux) or `Cmd+P` (Mac)
3. Set destination to "Save as PDF"
4. **Important settings**:
   - Remove headers & footers
   - Set margins to "Default" or "Minimum"
   - Enable background graphics (for colored templates)
5. Save!

### Tips for Best PDFs:
- Use Chrome or Edge for best print results
- Check "Print backgrounds" for colored templates
- For Minimal/Classic templates, backgrounds off is fine
- Preview before saving

---

## 🔄 The Modular Advantage

### Same Data, Different Looks
- Edit `resume-data.json` once
- All templates update automatically
- No need to maintain multiple versions

### Easy Switching
- Try different templates for different jobs
- Tech role? Use Professional Gradient
- Corporate role? Use Minimal Clean
- Creative role? Use Modern Bold

### No Data Loss
- Switch templates anytime
- Your content stays safe in `resume-data.json`
- Experiment freely!

---

## 💡 Best Practices

### 1. Keep Multiple PDFs
Export different templates for different purposes:
- `Resume-Hemanth-Tech.pdf` (Professional Gradient)
- `Resume-Hemanth-Corporate.pdf` (Minimal Clean)
- `Resume-Hemanth-1Page.pdf` (Compact)

### 2. Test Before Sending
- Always preview the template
- Check PDF export quality
- Test print layout

### 3. Match Industry Expectations
- Research company culture
- Check job posting style
- When in doubt, use Minimal Clean

### 4. Photo Decision
- US tech companies: Usually no photo
- European companies: Photos often expected
- Creative roles: Photos can help
- When uncertain: Prepare both versions

### 5. ATS Considerations
- For online applications: Use ATS-friendly templates
- For networking: Use any template
- For email to hiring manager: Use any template

---

## 📝 Creating Your Own Template

### Quick Start:
1. Copy `templates/minimal-clean.html`
2. Rename to `templates/my-template.html`
3. Modify the `<style>` section:
   ```css
   /* Change colors */
   --primary-color: #your-color;

   /* Change fonts */
   font-family: 'Your-Font', sans-serif;

   /* Adjust spacing */
   margin: your-values;
   ```
4. Test with your data!

### Template Structure:
All templates follow this structure:
```html
<!DOCTYPE html>
<html>
<head>
    <!-- Styles -->
</head>
<body>
    <div id="loading">Loading...</div>
    <div id="resume-content" style="display: none;">
        <!-- Content generated here -->
    </div>

    <script>
        // Load resume-data.json
        // Render content
    </script>
</body>
</html>
```

---

## 🆘 Troubleshooting

**Template not loading data?**
- Check that `resume-data.json` exists
- Verify file path in template (use `../resume-data.json` from templates folder)
- Check browser console (F12) for errors

**Colors not showing in PDF?**
- Enable "Background graphics" in print settings
- Try Chrome/Edge instead of Firefox/Safari

**Layout broken?**
- Hard refresh: `Ctrl+Shift+R`
- Clear browser cache
- Check for JavaScript errors in console

**Photo not showing?**
- Verify photo file exists
- Check filename matches `resume-data.json`
- Ensure correct path

---

## 🎓 Template Philosophy

### Why Multiple Templates?

1. **Different Industries Have Different Expectations**
   - Tech loves modern designs
   - Finance prefers conservative looks
   - Creative fields appreciate bold styles

2. **Different Purposes Need Different Formats**
   - Online applications: ATS-friendly
   - Networking: Memorable designs
   - Job fairs: Compact one-pagers

3. **Personal Preference Matters**
   - You should feel confident about your resume
   - Choose what represents you best
   - Your comfort shows through

### Design Principles:

All templates follow these principles:
- ✅ **Readability**: Content is king
- ✅ **Professionalism**: Appropriate for job search
- ✅ **Responsive**: Works on all screen sizes
- ✅ **Print-optimized**: Perfect PDFs
- ✅ **Data-driven**: Single source of truth

---

## 🚀 Quick Reference

**View all templates**: Open `templates.html`

**Edit content**: Edit `resume-data.json` or use `admin.html`

**Switch template**: Choose from `templates.html`

**Export PDF**: Press `Ctrl+P` on any template

**Add photo**: Save as `photo.jpg`, use photo variant

**Customize**: Edit template HTML/CSS files

---

**Need help? Check [MODULAR_GUIDE.md](MODULAR_GUIDE.md) for the complete system documentation!**
