let allMovies = [];

// Fetch movies from backend
fetch("https://vbomma-backend.onrender.com/movies")
  .then(res => {
    if (!res.ok) {
      throw new Error("Failed to fetch movies");
    }
    return res.json();
  })
  .then(data => {

    allMovies = data;

    // show only 50 movies on homepage
    const recentMovies = data.slice(0,25);

    showMovies(recentMovies);

  })
  .catch(err => {
    console.error("Fetch error:", err);
    document.getElementById("movies").innerHTML =
      "<p style='color:white'>Failed to load movies</p>";
  });


// SHOW MOVIES
function showMovies(movies) {

  const container = document.getElementById("movies");
  container.innerHTML = "";

  movies.forEach(movie => {

    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="${movie.thumbnail}" alt="${movie.title}">
      <h3>${movie.title}</h3>
    `;

    card.onclick = () => {
      window.location.href =
        `video.html?video=${encodeURIComponent(movie.video)}`
        + `&title=${encodeURIComponent(movie.title)}`
        + `&thumb=${encodeURIComponent(movie.thumbnail)}`
        + `&desc=${encodeURIComponent(movie.description || "Not available")}`
        + `&director=${encodeURIComponent(movie.director || "Not available")}`
        + `&year=${encodeURIComponent(movie.year || "Not available")}`
        + `&genre=${encodeURIComponent(movie.genre || "Not available")}`;
    };

    container.appendChild(card);

  });

}


// SEARCH
function searchMovies() {

  const text = document.getElementById("search").value.toLowerCase();

  const filtered = allMovies.filter(movie =>
    movie.title.toLowerCase().includes(text)
  );

  showMovies(filtered);

}


