const searchInput = document.getElementById("searchInput");
const resultsDiv = document.getElementById("results");
const statusText = document.getElementById("status");

const allShowsApi = "https://api.tvmaze.com/shows";
const searchShows = "https://api.tvmaze.com/search/shows?q=";

function getAllShows() {
  statusText.textContent = "Kraunami filmai...";

  fetch(allShowsApi)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      statusText.textContent = `Užkrauta: ${data.length} filmų`;
      data.forEach((movie) => {
        let reitingas;
        if (movie.rating.average) {
          reitingas = movie.rating.average;
        } else {
          reitingas = "Nėra";
        }

        const div = document.createElement("div");
        div.className = "card";

        div.innerHTML = `
            <img src = ${movie.image.medium} alt="nuotrauka">
            <h3> ${movie.name}</h3>
            <span class="rating">⭐ ${reitingas}</span>`;

        div.addEventListener("click", () => {
          window.location.href = `details.html?filmas=${movie.id}`;
        });

        resultsDiv.appendChild(div);
      });
    })
    .catch((error) => {
      console.log(error);
      statusText.textContent = "Atsiprašome, įvyko klaida";
    });
}

getAllShows();

searchInput.addEventListener("input", () => {
  const value = searchInput.value;

  if (value.length >= 4) {
    searchShowsByName(value);
  }
});

function searchShowsByName(value) {
  statusText.textContent = "Ieškoma...";
  resultsDiv.innerHTML = "";

  fetch(searchShows + value)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const movies = data.map((item) => item.show);
      statusText.textContent = `Pagal paiešką rasta: ${movies.length} filmų`;
      console.log(movies);
      movies
        .forEach((movie) => {
          const div = document.createElement("div");
          div.className = "card";
          let reitingas;
          if (movie.rating.average) {
            reitingas = movie.rating.average;
          } else {
            reitingas = "Vertinimo nėra";
          }

          let imgSrc = "";
          if (movie.image && movie.image.medium) {
            imgSrc = movie.image.medium;
          }

          div.innerHTML = `
            <img src="${imgSrc}" alt="nuotrauka">
            <h3> ${movie.name}</h3>
            <span class="rating">⭐ ${reitingas}</span>`;

          div.addEventListener("click", () => {
            window.location.href = `details.html?filmas=${movie.id}`;
          });

          resultsDiv.appendChild(div);
        })
        .catch((error) => {
          console.log(error);
          statusText.textContent = "Deja, filmu nebuvo rasta";
        });
    });
}
