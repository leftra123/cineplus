/**
 * CinePlus Movie Details Page JavaScript
 * Author: Jeremy Carter
 * License: MIT
 */

// Import modules
import { MovieService } from './movieService.js';
import { ThemeManager } from './themeManager.js';
import { RatingSystem } from './ratingSystem.js';

// Movie details controller
class MovieDetails {
    constructor() {
        // Initialize services
        this.movieService = new MovieService();
        this.themeManager = new ThemeManager();
        
        // Get movie ID from URL
        this.movieId = this.getMovieIdFromURL();
        
        // DOM elements
        this.movieContainer = document.getElementById('movie-container');
        this.videoSection = document.getElementById('video-section');
        this.videoPlayer = document.getElementById('movie-player');
        this.videoSource = document.getElementById('video-source');
        this.closeVideoBtn = document.getElementById('close-video');
        this.commentsContainer = document.getElementById('comments-container');
        this.relatedMoviesContainer = document.getElementById('related-movies');
        this.ratingStars = document.querySelectorAll('.ratings-form__stars i');
        this.commentForm = document.getElementById('comment-form');
        
        // Initialize the page
        this.init();
    }
    
    /**
     * Initialize the page
     */
    init() {
        // Load and display movie details
        this.loadMovieDetails();
        
        // Initialize rating system
        this.ratingSystem = new RatingSystem(this.movieId, this.ratingStars);
        
        // Set up event listeners
        this.setupEventListeners();
    }
    
    /**
     * Get the movie ID from the URL query parameters
     * @returns {string} - Movie ID
     */
    getMovieIdFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('id');
    }
    
    /**
     * Set up all event listeners
     */
    setupEventListeners() {
        // Close video button
        if (this.closeVideoBtn) {
            this.closeVideoBtn.addEventListener('click', () => {
                this.hideVideo();
            });
        }
        
        // Comment form
        if (this.commentForm) {
            this.commentForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.submitComment();
            });
        }
    }
    
    /**
     * Load and display movie details
     */
    loadMovieDetails() {
        if (!this.movieId) {
            this.showError('Movie ID not found in URL');
            return;
        }
        
        // Get movie data
        const movie = this.movieService.getMovieById(this.movieId);
        
        if (!movie) {
            this.showError('Movie not found');
            return;
        }
        
        // Update page title
        document.title = `${movie.title} - CinePlus`;
        
        // Render movie details
        this.renderMovieDetails(movie);
        
        // Load comments
        this.loadComments();
        
        // Load related movies
        this.loadRelatedMovies(movie.category);
    }
    
    /**
     * Render movie details
     * @param {Object} movie - Movie data
     */
    renderMovieDetails(movie) {
        // Clear loading indicator
        this.movieContainer.innerHTML = '';
        
        // Create movie details HTML
        const detailsHTML = `
            <img src="${movie.image}" alt="${movie.title}" class="movie-details__image">
            <div class="movie-details__content">
                <h2 class="movie-details__title">${movie.title}</h2>
                <div class="movie-details__meta">
                    <span><i class="fas fa-film"></i> ${movie.category}</span>
                    <span><i class="fas fa-star"></i> ${movie.rating || 'Not rated'}</span>
                </div>
                <p class="movie-details__description">${movie.description}</p>
                <div class="movie-details__actions">
                    <button id="watch-btn" class="button button--primary">
                        <i class="fas fa-play"></i> Watch Movie
                    </button>
                    <a href="${movie.downloadUrl}" download class="button button--secondary">
                        <i class="fas fa-download"></i> Download
                    </a>
                </div>
            </div>
        `;
        
        // Set movie details HTML
        this.movieContainer.innerHTML = detailsHTML;
        
        // Add event listener to watch button
        const watchBtn = document.getElementById('watch-btn');
        if (watchBtn) {
            watchBtn.addEventListener('click', () => {
                this.showVideo(movie.videoUrl);
            });
        }
    }
    
    /**
     * Show the video player
     * @param {string} videoUrl - Video URL
     */
    showVideo(videoUrl) {
        // Set video source
        this.videoSource.src = videoUrl;
        this.videoPlayer.load();
        
        // Show video section
        this.videoSection.classList.remove('hidden');
        
        // Start playback
        this.videoPlayer.play();
    }
    
    /**
     * Hide the video player
     */
    hideVideo() {
        // Pause video
        this.videoPlayer.pause();
        
        // Hide video section
        this.videoSection.classList.add('hidden');
        
        // Reset video source
        this.videoSource.src = '';
        this.videoPlayer.load();
    }
    
    /**
     * Load and display comments
     */
    loadComments() {
        // Get comments from local storage
        const comments = this.ratingSystem.getComments();
        
        // Clear comments container
        this.commentsContainer.innerHTML = '';
        
        if (comments.length === 0) {
            // Show empty message if no comments
            this.commentsContainer.innerHTML = `
                <p class="comments__empty">No reviews yet. Be the first to review this movie!</p>
            `;
            return;
        }
        
        // Render each comment
        comments.forEach(comment => {
            const commentElement = this.createCommentElement(comment);
            this.commentsContainer.appendChild(commentElement);
        });
    }
    
    /**
     * Create a comment element
     * @param {Object} comment - Comment data
     * @returns {HTMLElement} - Comment element
     */
    createCommentElement(comment) {
        const commentDiv = document.createElement('div');
        commentDiv.className = 'comment';
        
        // Format date
        const date = new Date(comment.date);
        const formattedDate = date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        // Create star rating HTML
        let starsHTML = '';
        for (let i = 1; i <= 5; i++) {
            const starClass = i <= comment.rating ? 'fas fa-star' : 'far fa-star';
            starsHTML += `<i class="${starClass}"></i>`;
        }
        
        // Set comment HTML
        commentDiv.innerHTML = `
            <div class="comment__header">
                <span class="comment__author">Anonymous User</span>
                <span class="comment__date">${formattedDate}</span>
            </div>
            <div class="comment__rating">${starsHTML}</div>
            <p class="comment__text">${comment.text}</p>
        `;
        
        return commentDiv;
    }
    
    /**
     * Submit a new comment
     */
    submitComment() {
        const commentText = this.commentForm.querySelector('textarea').value;
        const rating = this.ratingSystem.currentRating;
        
        // Validate input
        if (!commentText.trim() || rating === 0) {
            alert('Please provide both a rating and a comment.');
            return;
        }
        
        // Add comment
        this.ratingSystem.addComment(commentText);
        
        // Reset form
        this.commentForm.reset();
        this.ratingSystem.resetRating();
        
        // Reload comments
        this.loadComments();
    }
    
    /**
     * Load and display related movies
     * @param {string} category - Movie category
     */
    loadRelatedMovies(category) {
        // Get related movies
        const relatedMovies = this.movieService.getRelatedMovies(this.movieId, category);
        
        // Clear container
        this.relatedMoviesContainer.innerHTML = '';
        
        // Render related movies
        relatedMovies.forEach(movie => {
            const movieCard = this.createMovieCard(movie);
            this.relatedMoviesContainer.appendChild(movieCard);
        });
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
                </div>
            </a>
        `;
        
        return card;
    }
    
    /**
     * Show error message
     * @param {string} message - Error message
     */
    showError(message) {
        this.movieContainer.innerHTML = `
            <div class="error-message">
                <i class="fas fa-exclamation-triangle"></i>
                <p>${message}</p>
                <a href="index.html" class="button button--primary">Back to Home</a>
            </div>
        `;
    }
}

// Initialize the movie details page when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    new MovieDetails();
});