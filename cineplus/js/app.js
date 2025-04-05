/**
 * CinePlus Main Application JavaScript
 * Author: Jeremy Carter
 * License: MIT
 */

// Import modules
import { MovieService } from './movieService.js';
import { ThemeManager } from './themeManager.js';

// Main app controller
class App {
    constructor() {
        // Initialize services
        this.movieService = new MovieService();
        this.themeManager = new ThemeManager();
        
        // Variables for pagination
        this.currentPage = 1;
        this.moviesPerPage = 3; // Show 3 movies per page
        
        // DOM elements
        this.movieGallery = document.getElementById('movie-gallery');
        this.prevPageBtn = document.getElementById('prev-page');
        this.nextPageBtn = document.getElementById('next-page');
        this.pageIndicator = document.getElementById('page-indicator');
        this.searchForm = document.querySelector('.search-form');
        this.searchInput = document.querySelector('.search-form__input');
        this.filterSelect = document.querySelector('.filters__select');
        this.navToggle = document.querySelector('.nav__toggle');
        this.navMenu = document.getElementById('main-menu');
        
        // Initialize the app
        this.init();
    }
    
    /**
     * Initialize the application
     */
    init() {
        // Load movies and render the gallery
        this.loadMovies();
        
        // Setup event listeners
        this.setupEventListeners();
    }
    
    /**
     * Set up all event listeners
     */
    setupEventListeners() {
        // Pagination buttons
        this.prevPageBtn.addEventListener('click', () => this.changePage(-1));
        this.nextPageBtn.addEventListener('click', () => this.changePage(1));
        
        // Search form
        this.searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.searchMovies(this.searchInput.value);
        });
        
        // Filter
        this.filterSelect.addEventListener('change', () => {
            this.filterMovies(this.filterSelect.value);
        });
        
        // Mobile navigation toggle
        this.navToggle.addEventListener('click', () => {
            const isExpanded = this.navToggle.getAttribute('aria-expanded') === 'true';
            this.navToggle.setAttribute('aria-expanded', !isExpanded);
            this.navMenu.classList.toggle('active');
        });
    }
    
    /**
     * Load all movies from the service
     */
    loadMovies() {
        this.movies = this.movieService.getAllMovies();
        this.filteredMovies = [...this.movies];
        this.renderGallery();
        this.updatePaginationControls();
    }
    
    /**
     * Render the movie gallery
     */
    renderGallery() {
        // Clear the gallery
        this.movieGallery.innerHTML = '';
        
        // Calculate the movies to show for the current page
        const startIndex = (this.currentPage - 1) * this.moviesPerPage;
        const endIndex = startIndex + this.moviesPerPage;
        const moviesToShow = this.filteredMovies.slice(startIndex, endIndex);
        
        // Create and append movie cards
        moviesToShow.forEach(movie => {
            const movieCard = this.createMovieCard(movie);
            this.movieGallery.appendChild(movieCard);
        });
        
        // Update page indicator
        this.pageIndicator.textContent = `Page ${this.currentPage}`;
    }
    
    /**
     * Create a movie card element
     * @param {Object} movie - Movie data
     * @returns {HTMLElement} - Movie card element
     */
    createMovieCard(movie) {
        // Create the movie card elements
        const card = document.createElement('article');
        card.className = 'movie-card';
        
        // Add the movie content
        card.innerHTML = `
            <a href="movie.html?id=${movie.id}" class="movie-card__link">
                <img src="${movie.image}" alt="${movie.title}" class="movie-card__image">
                <div class="movie-card__content">
                    <h3 class="movie-card__title">${movie.title}</h3>
                    <div class="movie-card__rating">
                        <i class="fas fa-star"></i> 
                        <span>${movie.rating || 'Not rated'}</span>
                    </div>
                </div>
            </a>
        `;
        
        return card;
    }
    
    /**
     * Change the current page
     * @param {number} direction - Page change direction (1 for next, -1 for previous)
     */
    changePage(direction) {
        const newPage = this.currentPage + direction;
        const totalPages = Math.ceil(this.filteredMovies.length / this.moviesPerPage);
        
        // Check if the new page is valid
        if (newPage >= 1 && newPage <= totalPages) {
            this.currentPage = newPage;
            this.renderGallery();
            this.updatePaginationControls();
        }
    }
    
    /**
     * Update the pagination controls state
     */
    updatePaginationControls() {
        const totalPages = Math.ceil(this.filteredMovies.length / this.moviesPerPage);
        
        // Disable/enable previous page button
        this.prevPageBtn.disabled = this.currentPage === 1;
        
        // Disable/enable next page button
        this.nextPageBtn.disabled = this.currentPage === totalPages;
    }
    
    /**
     * Search movies by title
     * @param {string} query - Search query
     */
    searchMovies(query) {
        if (!query.trim()) {
            // If the search is empty, show all movies
            this.filteredMovies = [...this.movies];
        } else {
            // Filter movies by title
            const searchTerm = query.toLowerCase();
            this.filteredMovies = this.movies.filter(movie => 
                movie.title.toLowerCase().includes(searchTerm)
            );
        }
        
        // Reset to first page and update
        this.currentPage = 1;
        this.renderGallery();
        this.updatePaginationControls();
    }
    
    /**
     * Filter movies by category
     * @param {string} category - Category to filter by
     */
    filterMovies(category) {
        if (!category) {
            // If no category selected, show all movies
            this.filteredMovies = [...this.movies];
        } else {
            // Filter movies by category
            this.filteredMovies = this.movies.filter(movie => 
                movie.category === category
            );
        }
        
        // Reset to first page and update
        this.currentPage = 1;
        this.renderGallery();
        this.updatePaginationControls();
    }
}

// Initialize the app when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    new App();
});