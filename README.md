# CinePlus

A modern, responsive movie streaming website built with semantic HTML5, modern CSS, and vanilla JavaScript.

## Features

- **Responsive Design**: Works on all devices from mobile to desktop
- **Semantic HTML5**: Well-structured and accessible
- **Movie Gallery**: Browse movies with pagination
- **Search and Filtering**: Find movies by title or category
- **Movie Details**: View detailed information about each movie
- **Video Player**: Watch movies directly on the site
- **Download Option**: Download movies for offline viewing
- **Rating System**: Rate movies and leave reviews
- **Dark/Light Mode**: Toggle between dark and light themes
- **LocalStorage**: Save user preferences and ratings

## Project Structure

```
cineplus/
├── index.html              # Home page
├── movie.html              # Movie details page
├── css/
│   └── style.css           # Main stylesheet
├── js/
│   ├── app.js              # Main application script
│   ├── movie.js            # Movie details page script
│   ├── movieService.js     # Movie data service
│   ├── themeManager.js     # Theme management
│   └── ratingSystem.js     # Rating and comments system
├── images/                 # Movie images and logos
├── videos/                 # Movie video files (sample)
└── downloads/              # Downloadable movie files
```

## Getting Started

1. Clone or download this repository
2. Open `index.html` in your browser
3. Browse movies, search, and explore the features

## Development

This project uses vanilla JavaScript with an object-oriented approach. Each functionality is encapsulated in its own module:

- **MovieService**: Manages movie data
- **ThemeManager**: Handles dark/light theme toggling
- **RatingSystem**: Manages movie ratings and comments

## CSS Architecture

The CSS follows a component-based structure with BEM naming convention:

- Variables for colors, spacing, and typography
- Responsive design with media queries
- Component-based organization
- Dark/light theme support

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT License - Created by Jeremy Carter

---

## Notes for Students

This project demonstrates best practices for front-end web development:

1. **Semantic HTML**: Using proper HTML5 elements for better accessibility and SEO
2. **CSS Variables**: Creating reusable design tokens
3. **BEM Methodology**: Structuring CSS for maintainability
4. **Responsive Design**: Creating layouts that work on all screen sizes
5. **JavaScript Modules**: Organizing code into reusable components
6. **localStorage API**: Persisting data on the client side
7. **Accessibility**: Ensuring the site is usable by everyone

Feel free to modify and extend this project for your own learning!