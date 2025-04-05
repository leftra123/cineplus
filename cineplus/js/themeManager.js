/**
 * CinePlus Theme Manager
 * Author: Jeremy Carter
 * License: MIT
 * 
 * Manages dark/light theme switching
 */

export class ThemeManager {
    constructor() {
        // Theme options
        this.THEMES = {
            DARK: 'dark-theme',
            LIGHT: 'light-theme'
        };
        
        // Local storage key for theme
        this.STORAGE_KEY = 'cineplus-theme';
        
        // DOM elements
        this.themeToggle = document.querySelector('.theme-toggle');
        this.body = document.body;
        
        // Initialize theme
        this.init();
    }
    
    /**
     * Initialize theme system
     */
    init() {
        // Load saved theme from local storage or use dark theme as default
        this.currentTheme = localStorage.getItem(this.STORAGE_KEY) || this.THEMES.DARK;
        
        // Apply theme
        this.applyTheme(this.currentTheme);
        
        // Set up event listeners
        this.setupEventListeners();
    }
    
    /**
     * Set up event listeners for theme toggling
     */
    setupEventListeners() {
        if (this.themeToggle) {
            this.themeToggle.addEventListener('click', () => {
                this.toggleTheme();
            });
        }
    }
    
    /**
     * Toggle between dark and light themes
     */
    toggleTheme() {
        // Toggle theme
        this.currentTheme = 
            this.currentTheme === this.THEMES.DARK ? 
            this.THEMES.LIGHT : this.THEMES.DARK;
        
        // Apply the new theme
        this.applyTheme(this.currentTheme);
        
        // Save to local storage
        localStorage.setItem(this.STORAGE_KEY, this.currentTheme);
    }
    
    /**
     * Apply the specified theme
     * @param {string} theme - Theme to apply
     */
    applyTheme(theme) {
        // Update body class
        if (theme === this.THEMES.LIGHT) {
            this.body.classList.remove(this.THEMES.DARK);
            this.body.classList.add(this.THEMES.LIGHT);
            this.updateThemeToggleIcon('fa-sun');
        } else {
            this.body.classList.remove(this.THEMES.LIGHT);
            this.body.classList.add(this.THEMES.DARK);
            this.updateThemeToggleIcon('fa-moon');
        }
    }
    
    /**
     * Update the theme toggle icon
     * @param {string} iconClass - Font Awesome icon class
     */
    updateThemeToggleIcon(iconClass) {
        if (this.themeToggle) {
            const icon = this.themeToggle.querySelector('i');
            if (icon) {
                icon.className = `fas ${iconClass}`;
            }
        }
    }
}