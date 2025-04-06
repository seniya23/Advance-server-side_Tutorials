document.getElementById('search-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const searchTerm = document.getElementById('search-input').value;
    const apiKey = 'aa83d60e'; // Replace with your actual API key
    const url = `http://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(searchTerm)}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const movieResults = document.getElementById('movie-results');
            movieResults.innerHTML = '';

            if (data.Response === "True") {
                data.Search.forEach(movie => {
                    const movieElement = document.createElement('div');
                    movieElement.classList.add('movie');
                    
                    const moviePoster = document.createElement('img');
                    moviePoster.src = movie.Poster !== "N/A" ? movie.Poster : 'https://via.placeholder.com/150';
                    moviePoster.alt = `${movie.Title} Poster`;

                    const movieTitle = document.createElement('h2');
                    movieTitle.textContent = movie.Title;

                    movieElement.appendChild(moviePoster);
                    movieElement.appendChild(movieTitle);
                    movieResults.appendChild(movieElement);
                });
            } else {
                movieResults.textContent = 'No movies found.';
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
});