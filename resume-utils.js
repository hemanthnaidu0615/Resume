/**
 * Smart Resume Template Utilities
 * Helper functions for conditional rendering and intelligent layout
 * Include this in any template for smart behavior
 */

const ResumeUtils = {
    /**
     * Check if a section has displayable data
     */
    hasData(section) {
        if (!section) return false;
        if (Array.isArray(section)) return section.length > 0;
        if (typeof section === 'object') return Object.keys(section).length > 0;
        if (typeof section === 'string') return section.trim().length > 0;
        return Boolean(section);
    },

    /**
     * Check if any of the sections have data
     */
    hasAnyData(...sections) {
        return sections.some(section => this.hasData(section));
    },

    /**
     * Get non-empty sections count
     */
    getSectionCount(data, sectionNames) {
        return sectionNames.filter(name => this.hasData(data[name])).length;
    },

    /**
     * Render section only if it has data
     */
    renderIf(condition, htmlFunction) {
        return condition ? htmlFunction() : '';
    },

    /**
     * Format date range
     */
    formatDateRange(startDate, endDate, current = false) {
        if (current) return `${startDate} - Present`;
        return `${startDate} - ${endDate}`;
    },

    /**
     * Calculate duration between dates
     */
    calculateDuration(startDate, endDate) {
        // Simple implementation - can be enhanced
        const start = new Date(startDate);
        const end = endDate === 'Present' ? new Date() : new Date(endDate);

        const months = (end.getFullYear() - start.getFullYear()) * 12 +
                       (end.getMonth() - start.getMonth());

        const years = Math.floor(months / 12);
        const remainingMonths = months % 12;

        if (years === 0) return `${months} month${months !== 1 ? 's' : ''}`;
        if (remainingMonths === 0) return `${years} year${years !== 1 ? 's' : ''}`;
        return `${years} year${years !== 1 ? 's' : ''} ${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`;
    },

    /**
     * Truncate text to length
     */
    truncate(text, maxLength) {
        if (!text || text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    },

    /**
     * Clean HTML for plain text
     */
    stripHTML(html) {
        const div = document.createElement('div');
        div.innerHTML = html;
        return div.textContent || div.innerText || '';
    },

    /**
     * Get proficiency level color/style
     */
    getProficiencyStyle(proficiency) {
        const levels = {
            'Native': 'expert',
            'Native/Bilingual': 'expert',
            'Professional Working': 'advanced',
            'Limited Working': 'intermediate',
            'Elementary': 'beginner'
        };
        return levels[proficiency] || 'beginner';
    },

    /**
     * Validate email format
     */
    isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    },

    /**
     * Validate URL format
     */
    isValidURL(url) {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    },

    /**
     * Format URL for display (remove protocol)
     */
    formatURL(url) {
        return url.replace(/^https?:\/\//, '').replace(/\/$/, '');
    },

    /**
     * Get icon for section type
     */
    getSectionIcon(sectionName) {
        const icons = {
            'education': '🎓',
            'experience': '💼',
            'skills': '💻',
            'certifications': '📜',
            'languages': '🌍',
            'projects': '🚀',
            'volunteer': '🤝',
            'awards': '🏆',
            'publications': '📚',
            'courses': '📖',
            'speaking': '🎤',
            'patents': '🔬',
            'interests': '🎯',
            'references': '📞'
        };
        return icons[sectionName] || '📄';
    },

    /**
     * Sort items by date (most recent first)
     */
    sortByDate(items, dateField = 'date') {
        return [...items].sort((a, b) => {
            const dateA = new Date(a[dateField] === 'Present' ? new Date() : a[dateField]);
            const dateB = new Date(b[dateField] === 'Present' ? new Date() : b[dateField]);
            return dateB - dateA;
        });
    },

    /**
     * Group skills by category
     */
    groupSkills(skills) {
        // Skills are already grouped in the data structure
        return skills;
    },

    /**
     * Get ATS score for template
     */
    getATSScore(data, templateType) {
        let score = 100;

        // Penalize for missing key sections
        if (!this.hasData(data.experience)) score -= 30;
        if (!this.hasData(data.education)) score -= 20;
        if (!this.hasData(data.skills)) score -= 20;

        // Bonus for having contact info
        if (this.isValidEmail(data.personal.email)) score += 0;
        if (data.personal.phone) score += 0;

        // Template-specific adjustments
        const templateScores = {
            'minimal-clean': 1.0,
            'classic-traditional': 1.0,
            'compact-onepage': 0.95,
            'professional-gradient': 0.85,
            'twocolumn-modern': 0.85,
            'modern-bold': 0.75
        };

        score *= (templateScores[templateType] || 0.9);

        return Math.max(0, Math.min(100, Math.round(score)));
    },

    /**
     * Check if resume is complete
     */
    isComplete(data) {
        const required = ['personal', 'education', 'experience', 'skills'];
        return required.every(section => this.hasData(data[section]));
    },

    /**
     * Get completion percentage
     */
    getCompletionPercent(data) {
        const allSections = [
            'personal', 'education', 'experience', 'skills',
            'certifications', 'languages', 'projects', 'volunteer',
            'awards', 'publications', 'achievements'
        ];

        const completed = allSections.filter(section => this.hasData(data[section])).length;
        return Math.round((completed / allSections.length) * 100);
    },

    /**
     * Suggest improvements
     */
    getSuggestions(data) {
        const suggestions = [];

        if (!this.hasData(data.certifications)) {
            suggestions.push('Add certifications to strengthen your profile');
        }
        if (!this.hasData(data.projects)) {
            suggestions.push('Include personal projects to showcase your skills');
        }
        if (!this.hasData(data.languages)) {
            suggestions.push('List languages you speak for international opportunities');
        }
        if (data.experience && data.experience.length === 0) {
            suggestions.push('Add work experience to highlight your career');
        }

        return suggestions;
    },

    /**
     * Auto-detect best template for data
     */
    recommendTemplate(data) {
        // If has many certifications/awards - use Classic Traditional
        if (this.hasData(data.certifications) && data.certifications.length > 3) {
            return 'classic-traditional';
        }

        // If very experienced - use Professional Gradient
        if (this.hasData(data.experience) && data.experience.length > 3) {
            return 'professional-gradient';
        }

        // If has projects/publications - use Modern Bold
        if (this.hasAnyData(data.projects, data.publications, data.speaking)) {
            return 'modern-bold';
        }

        // If needs one-page - use Compact
        const sectionCount = this.getSectionCount(data, [
            'education', 'experience', 'skills', 'certifications',
            'projects', 'volunteer', 'awards'
        ]);
        if (sectionCount <= 4) {
            return 'compact-onepage';
        }

        // Default to minimal clean (ATS-friendly)
        return 'minimal-clean';
    }
};

// Export for use in templates
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ResumeUtils;
}
