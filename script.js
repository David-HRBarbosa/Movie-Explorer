const apiKey = '1370bcc233b055a97a315bd4cf15c259'; // substitua pela sua chave da TMDB
const apiUrl = 'https://api.themoviedb.org/3';

const movieGrid = document.querySelector('.movie-grid');
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');

// Função para buscar filmes populares
async function fetchPopularMovies() {
  const response = await fetch(`${apiUrl}/movie/popular?api_key=${apiKey}&language=en-US&page=1`);
  const data = await response.json();
  displayMovies(data.results);
}

// Função para buscar filmes pelo termo digitado
async function searchMovies(query) {
  const response = await fetch(`${apiUrl}/search/movie?api_key=${apiKey}&language=en-US&query=${query}`);
  const data = await response.json();
  displayMovies(data.results);
}

// Função para exibir os filmes
function displayMovies(movies) {
  movieGrid.innerHTML = '';

  if (movies.length === 0) {
    movieGrid.innerHTML = '<p>No movies found.</p>';
    return;
  }

  movies.forEach(movie => {
    const card = document.createElement('div');
    card.classList.add('movie-card');
    card.setAttribute('data-id', movie.id);
    card.innerHTML = `
      <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
      <div class="movie-info">
        <div class="movie-title">${movie.title}</div>
        <div class="movie-year">${movie.release_date ? movie.release_date.split('-')[0] : 'N/A'}</div>
      </div>
    `;
    card.addEventListener('click', () => {
      window.location.href = `details.html?id=${movie.id}`;
    });
    movieGrid.appendChild(card);
  });
}

// Evento de busca por clique
searchButton.addEventListener('click', () => {
  const query = searchInput.value.trim();
  if (query) {
    searchMovies(query);
  }
});

// Evento de busca por digitação (Enter)
searchInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const query = searchInput.value.trim();
    if (query) {
      searchMovies(query);
    }
  }
});

// Carrega os filmes populares inicialmente
fetchPopularMovies();
