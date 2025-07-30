const apiKey = '1370bcc233b055a97a315bd4cf15c259';
const apiUrl = 'https://api.themoviedb.org/3';

// Obter o ID do filme da URL
const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get('id');

// Selecionar o container onde os detalhes serão exibidos
const detailsContainer = document.getElementById('movie-details');

// Buscar os detalhes do filme na API
async function fetchMovieDetails(id) {
  try {
    const response = await fetch(`${apiUrl}/movie/${id}?api_key=${apiKey}&language=en-US`);
    const movie = await response.json();
    displayMovieDetails(movie);
  } catch (error) {
    detailsContainer.innerHTML = `<p>Error loading movie details.</p>`;
    console.error(error);
  }
}

// Exibir os detalhes do filme
function displayMovieDetails(movie) {
  detailsContainer.innerHTML = `
    <div class="movie-detail-card">
      <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
      <div class="movie-detail-info">
        <h2>${movie.title}</h2>
        <p><strong>Release Date:</strong> ${movie.release_date}</p>
        <p><strong>Rating:</strong> ${movie.vote_average} / 10</p>
        <p><strong>Overview:</strong> ${movie.overview}</p>
        <p><strong>Genres:</strong> ${movie.genres.map(g => g.name).join(', ')}</p>
        <a href="index.html" class="back-button">← Back to Home</a>
      </div>
    </div>
  `;
}

// Iniciar a busca pelos detalhes
if (movieId) {
  fetchMovieDetails(movieId);
} else {
  detailsContainer.innerHTML = `<p>Movie not found.</p>`;
}

// Buscar vídeos (trailers) do filme
async function fetchTrailer(id) {
  try {
    const response = await fetch(`${apiUrl}/movie/${id}/videos?api_key=${apiKey}&language=en-US`);
    const data = await response.json();
    const trailer = data.results.find(video => video.type === 'Trailer' && video.site === 'YouTube');
    return trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : null;
  } catch (error) {
    console.error("Error fetching trailer:", error);
    return null;
  }
}

// Exibir os detalhes do filme
async function displayMovieDetails(movie) {
  const trailerUrl = await fetchTrailer(movie.id);

  detailsContainer.innerHTML = `
    <div class="movie-detail-card">
      <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
      <div class="movie-detail-info">
        <h2>${movie.title}</h2>
        <p><strong>Release Date:</strong> ${movie.release_date}</p>
        <p><strong>Rating:</strong> ${movie.vote_average} / 10</p>
        <p><strong>Genres:</strong> ${movie.genres.map(g => g.name).join(', ')}</p>
        <p><strong>Overview:</strong> ${movie.overview}</p>

        ${trailerUrl ? `<a href="${trailerUrl}" class="watch-button" target="_blank">🎬 Watch Trailer</a>` : ''}
        <a href="https://www.themoviedb.org/movie/${movie.id}" class="tmdb-button" target="_blank">🌐 View on TMDB</a>
        <a href="index.html" class="back-button">← Back to Home</a>
      </div>
    </div>
  `;
}
