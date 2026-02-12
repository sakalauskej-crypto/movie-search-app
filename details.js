const detailsDiv = document.getElementById("details");
const api = "https://api.tvmaze.com/shows/";

// gaunu prieiga prie narsykles dabartines nuorodos
const params = new URLSearchParams(window.location.search);

const movieId = params.get("filmas");
const movieCastApi = `https://api.tvmaze.com/shows/${movieId}/cast`;
function getMovieDetails() {
  fetch(`${api}${movieId}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      fetch(movieCastApi)
        .then((response) => response.json())
        .then((cast) => {
          // Sugeneruotas aktorių sąrašas
          let castHtml = "";
          cast.slice(0,6).forEach((item) => {
            if (item.person.image) {
              castHtml += `
                    <div style=" width: 160px; margin-bottom: 10px;">
                        <img src="${item.person.image.medium}" style="width: 100%; height: 200px; object-fit: cover;">
                        <p><strong>${item.person.name}</strong> as ${item.character.name}</p>
                    </div>
                `;
            }
          });
          detailsDiv.innerHTML = `
        <h1>${data.name}</h1>
        ${
          data.image
            ? ` <img src="${data.image.original}" alt="nuotrauka">`
            : ""
        }
        <p><strong>Reitingas: ⭐</strong> ${data.rating.average ?? "Nera"}</p>

        <h3>Aprašymas:</h3>
                <div>${data.summary}</div>

                </div>
                    <h2>Aktoriai</h2>
                    <div style="display: flex; flex-wrap: wrap; gap: 10px;">
                        ${castHtml}
                    </div>
                </div>`;
        });
    })
    .catch((error) => {
      console.log(error);
    });
}

getMovieDetails();
