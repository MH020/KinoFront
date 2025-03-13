const url = "http://localhost:8080";
//const url = "http://rigtig-url";

fetch(`${url}/movie/all`)
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
    });

}

