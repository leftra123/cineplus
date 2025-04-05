/**
 * CinePlus Rating System
 * Author: Jeremy Carter
 * License: MIT
 * 
 * Manages movie ratings and comments
 */

export class RatingSystem {
    constructor(movieId, ratingStars) {
        // Movie ID for storing ratings
        this.movieId = movieId;
        
        // DOM elements
        this.ratingStars = ratingStars;
        
        // Current user rating
        this.currentRating = 0;
        
        // Local storage keys
        this.COMMENTS_KEY = `cineplus-comments-${this.movieId}`;
        this.RATING_KEY = `cineplus-rating-${this.movieId}`;
        
        // Initialize rating system
        this.init();
    }
    
    /**
     * Initialize rating system
     */
    init() {
        // Load saved rating
        this.loadUserRating();
        
        // Set up event listeners
        this.setupEventListeners();
    }
    
    /**
     * Set up event listeners for rating stars
     */
    setupEventListeners() {
        // Star rating events
        if (this.ratingStars) {
            this.ratingStars.forEach(star => {
                // Mouse enter event
                star.addEventListener('mouseenter', () => {
                    const rating = parseInt(star.dataset.rating);
                    this.highlightStars(rating);
                });
                
                // Mouse leave event
                star.addEventListener('mouseleave', () => {
                    this.highlightStars(this.currentRating);
                });
                
                // Click event
                star.addEventListener('click', () => {
                    const rating = parseInt(star.dataset.rating);
                    this.setRating(rating);
                });
            });
        }
    }
    
    /**
     * Highlight stars up to the specified rating
     * @param {number} rating - Rating value
     */
    highlightStars(rating) {
        if (this.ratingStars) {
            this.ratingStars.forEach(star => {
                const starRating = parseInt(star.dataset.rating);
                
                if (starRating <= rating) {
                    star.classList.remove('far');
                    star.classList.add('fas');
                    star.classList.add('active');
                } else {
                    star.classList.remove('fas');
                    star.classList.remove('active');
                    star.classList.add('far');
                }
            });
        }
    }
    
    /**
     * Set the current user rating
     * @param {number} rating - Rating value
     */
    setRating(rating) {
        this.currentRating = rating;
        this.highlightStars(rating);
        
        // Save rating to localStorage
        localStorage.setItem(this.RATING_KEY, rating.toString());
    }
    
    /**
     * Reset the current rating
     */
    resetRating() {
        this.currentRating = 0;
        this.highlightStars(0);
    }
    
    /**
     * Load the user's saved rating
     */
    loadUserRating() {
        const savedRating = localStorage.getItem(this.RATING_KEY);
        
        if (savedRating) {
            this.currentRating = parseInt(savedRating);
            this.highlightStars(this.currentRating);
        }
    }
    
    /**
     * Get all comments for the current movie
     * @returns {Array} - Array of comments
     */
    getComments() {
        const savedComments = localStorage.getItem(this.COMMENTS_KEY);
        return savedComments ? JSON.parse(savedComments) : [];
    }
    
    /**
     * Add a new comment
     * @param {string} text - Comment text
     */
    addComment(text) {
        // Get existing comments
        const comments = this.getComments();
        
        // Create new comment
        const newComment = {
            id: Date.now(),
            text: text,
            rating: this.currentRating,
            date: new Date().toISOString()
        };
        
        // Add to comments array
        comments.push(newComment);
        
        // Save to localStorage
        localStorage.setItem(this.COMMENTS_KEY, JSON.stringify(comments));
        
        return newComment;
    }
}