/**
 * CinePlus Movie Service
 * Author: Jeremy Carter
 * License: MIT
 * 
 * Service for accessing movie data
 */

export class MovieService {
    constructor() {
        // Initialize the movie data
        this.initializeMovies();
    }
    
    /**
     * Initialize movies data
     */
    initializeMovies() {
        // Sample movie data
        this.movies = [
            {
                id: 'star1',
                title: 'Star Wars: Episode I',
                category: 'sci-fi',
                image: 'images/star_wars1.webp',
                description: 'Two Jedi escape a hostile blockade to find a new young ally who may bring balance to the Force, but the long dormant Sith resurface to claim their old glory.',
                rating: 4.2,
                videoUrl: 'videos/star1.mp4',
                downloadUrl: 'downloads/star1.mp4'
            },
            {
                id: 'star2',
                title: 'Star Wars: Episode II',
                category: 'sci-fi',
                image: 'images/star_wars2.webp',
                description: 'Ten years after initially meeting, Anakin Skywalker shares a forbidden romance with Padmé Amidala, while Obi-Wan Kenobi investigates an assassination attempt on the senator and discovers a secret clone army crafted for the Jedi.',
                rating: 4.0,
                videoUrl: 'videos/star2.mp4',
                downloadUrl: 'downloads/star2.mp4'
            },
            {
                id: 'star3',
                title: 'Star Wars: Episode III',
                category: 'sci-fi',
                image: 'images/star_wars3.webp',
                description: 'Three years into the Clone Wars, the Jedi rescue Palpatine from Count Dooku. As Obi-Wan pursues a new threat, Anakin acts as a double agent between the Jedi Council and Palpatine and is lured into a sinister plan to rule the galaxy.',
                rating: 4.5,
                videoUrl: 'videos/star3.mp4',
                downloadUrl: 'downloads/star3.mp4'
            },
            {
                id: 'trans1',
                title: 'Transformers',
                category: 'action',
                image: 'images/transformers1.webp',
                description: 'An ancient struggle between two Cybertronian races, the heroic Autobots and the evil Decepticons, comes to Earth, with a clue to the ultimate power held by a teenager.',
                rating: 4.1,
                videoUrl: 'videos/trans1.mp4',
                downloadUrl: 'downloads/trans1.mp4'
            },
            {
                id: 'trans2',
                title: 'Transformers: Revenge of the Fallen',
                category: 'action',
                image: 'images/trans2.webp',
                description: 'Sam Witwicky leaves the Autobots behind for a normal life. But when his mind is filled with cryptic symbols, the Decepticons target him and he is dragged back into the Transformers\' war.',
                rating: 3.9,
                videoUrl: 'videos/trans2.mp4',
                downloadUrl: 'downloads/trans2.mp4'
            },
            {
                id: 'trans3',
                title: 'Transformers: Dark of the Moon',
                category: 'action',
                image: 'images/trans3.webp',
                description: 'The Autobots learn of a Cybertronian spacecraft hidden on the moon, and race against the Decepticons to reach it and to learn its secrets.',
                rating: 4.0,
                videoUrl: 'videos/trans3.mp4',
                downloadUrl: 'downloads/trans3.mp4'
            },
            {
                id: 'trans4',
                title: 'Transformers: Age of Extinction',
                category: 'action',
                image: 'images/trans4.webp',
                description: 'When humanity allies with a bounty hunter in pursuit of Optimus Prime, the Autobots turn to a mechanic and his family for help.',
                rating: 3.7,
                videoUrl: 'videos/trans4.mp4',
                downloadUrl: 'downloads/trans4.mp4'
            },
            {
                id: 'trans5',
                title: 'Transformers: The Last Knight',
                category: 'action',
                image: 'images/trans5.webp',
                description: 'A deadly threat from Earth\'s history reappears, and a hunt for a lost artifact takes place between Autobots and Decepticons, while Optimus Prime encounters his creator in space.',
                rating: 3.5,
                videoUrl: 'videos/trans5.mp4',
                downloadUrl: 'downloads/trans5.mp4'
            }
        ];
    }
    
    /**
     * Get all movies
     * @returns {Array} - Array of all movies
     */
    getAllMovies() {
        return [...this.movies];
    }
    
    /**
     * Get a movie by ID
     * @param {string} id - Movie ID
     * @returns {Object|null} - Movie object or null if not found
     */
    getMovieById(id) {
        return this.movies.find(movie => movie.id === id) || null;
    }
    
    /**
     * Get related movies (same category, excluding the current movie)
     * @param {string} currentId - Current movie ID to exclude
     * @param {string} category - Category to filter by
     * @param {number} limit - Maximum number of related movies to return
     * @returns {Array} - Array of related movies
     */
    getRelatedMovies(currentId, category, limit = 3) {
        return this.movies
            .filter(movie => movie.id !== currentId && movie.category === category)
            .slice(0, limit);
    }
    
    /**
     * Search movies by title
     * @param {string} query - Search query
     * @returns {Array} - Array of matching movies
     */
    searchMovies(query) {
        const searchTerm = query.toLowerCase();
        return this.movies.filter(movie => 
            movie.title.toLowerCase().includes(searchTerm)
        );
    }
    
    /**
     * Filter movies by category
     * @param {string} category - Category to filter by
     * @returns {Array} - Array of filtered movies
     */
    filterByCategory(category) {
        return this.movies.filter(movie => movie.category === category);
    }
}