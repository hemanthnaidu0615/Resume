// Template Generator Script
// Run this with: node generate-templates.js
// This will create all template HTML files

const fs = require('fs');
const path = require('path');

// Base template structure that all templates will use
const templates = {
  'minimal-clean': {
    name: 'Minimal Clean',
    colors: {
      primary: '#000000',
      secondary: '#4B5563',
      accent: '#1F2937'
    },
    font: 'system-ui',
    style: 'minimal'
  },
  'minimal-clean-photo': {
    name: 'Minimal Clean with Photo',
    colors: {
      primary: '#000000',
      secondary: '#4B5563',
      accent: '#1F2937'
    },
    font: 'system-ui',
    style: 'minimal',
    hasPhoto: true
  },
  'professional-gradient-photo': {
    name: 'Professional Gradient with Photo',
    colors: {
      primary: '#667eea',
      secondary: '#764ba2',
      accent: '#4F46E5'
    },
    font: 'Inter',
    style: 'gradient',
    hasPhoto: true
  },
  'modern-bold': {
    name: 'Modern Bold',
    colors: {
      primary: '#06B6D4',
      secondary: '#2563EB',
      accent: '#0891B2'
    },
    font: 'Inter',
    style: 'modern'
  },
  'modern-bold-photo': {
    name: 'Modern Bold with Photo',
    colors: {
      primary: '#06B6D4',
      secondary: '#2563EB',
      accent: '#0891B2'
    },
    font: 'Inter',
    style: 'modern',
    hasPhoto: true
  },
  'classic-traditional': {
    name: 'Classic Traditional',
    colors: {
      primary: '#334155',
      secondary: '#1E293B',
      accent: '#475569'
    },
    font: 'Georgia, serif',
    style: 'classic'
  },
  'classic-traditional-photo': {
    name: 'Classic Traditional with Photo',
    colors: {
      primary: '#334155',
      secondary: '#1E293B',
      accent: '#475569'
    },
    font: 'Georgia, serif',
    style: 'classic',
    hasPhoto: true
  },
  'compact-onepage': {
    name: 'Compact One-Page',
    colors: {
      primary: '#059669',
      secondary: '#0D9488',
      accent: '#047857'
    },
    font: 'system-ui',
    style: 'compact'
  },
  'compact-onepage-photo': {
    name: 'Compact One-Page with Photo',
    colors: {
      primary: '#059669',
      secondary: '#0D9488',
      accent: '#047857'
    },
    font: 'system-ui',
    style: 'compact',
    hasPhoto: true
  },
  'twocolumn-modern': {
    name: 'Two-Column Modern',
    colors: {
      primary: '#E11D48',
      secondary: '#EC4899',
      accent: '#BE123C'
    },
    font: 'Inter',
    style: 'twocolumn'
  },
  'twocolumn-modern-photo': {
    name: 'Two-Column Modern with Photo',
    colors: {
      primary: '#E11D48',
      secondary: '#EC4899',
      accent: '#BE123C'
    },
    font: 'Inter',
    style: 'twocolumn',
    hasPhoto: true
  }
};

console.log('Template generation script ready!');
console.log('Templates to be created:', Object.keys(templates).length);
console.log('\\nRun this in Node.js environment to generate all templates.');
console.log('\\nFor now, templates will be created manually through the CLI.');
