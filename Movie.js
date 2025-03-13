const url = "http://localhost:8080";
const azureUrl = "https://kinobackapp-exhffhcdf8ekcaa3.northeurope-01.azurewebsites.net"


const movieButton = document.querySelector("#add-movie-button");


fetch(`${azureUrl}/movie/all`)
    .then(response => {
        if (!response.ok) {
            throw new Error("FEJL NUMBNUTS");
        }
        return response.json();
    })
    .then(movies => {
        console.log(movies);
        displayMovieText(movies);
    })
    .catch(err => {
        console.error("Der opstod en fejl:", err);
    });


function fetchAllMovies() {
    fetch(`${azureUrl}/movie/all`)

        .then(response => {
            if (!response.ok) {
                throw new Error("FEJL NUMBNUTS");
            }
            return response.json();
        })
        .then(movies => {
            console.log(movies);
            displayMovieText(movies);
        })
        .catch(err => {
            console.error("Der opstod en fejl:", err);
        });
}

fetchAllMovies();

//for each movie in movies, add a new moviecard, and add movie info.
function displayMovieText(movies) {
    if (!movies) {
        console.warn("Ingen film fundet.");
        return;
    }
    
    const div = document.querySelector("#movie-list");


    movies.forEach(movie => {
        const movieinfo = document.createElement("div");
        movieinfo.classList.add("movieinfo");

        movieinfo.innerHTML = `
            <h2>${movie.title}</h2>
            <p><strong>Udgivelsesår:</strong> ${movie.releaseYear}</p>
            <p><strong>Varighed:</strong> ${movie.duration}</p>
            <p><strong>Beskrivelse:</strong> ${movie.description}</p>
        `;

        div.append(movieinfo);
    })

}
