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
    })
}



function addMovie(movie) {
    const div = document.querySelector("#movie-list");

    const addMovie = document.createElement("div");
    movieinfo.classList.add("addMovie");

    addMovie.innerHTML = `
    <h2>Add Movie</h2>
    <label for="title">Title:</label>
    <input type="text" id="title" name="title" value="${movie.title || ''}"><br>

    <label for="releaseYear">Udgivelsesår:</label>
    <input type="number" id="releaseYear" name="releaseYear" value="${movie.releaseYear || ''}"><br>

    <label for="duration">Varighed:</label>
    <input type="text" id="duration" name="duration" value="${movie.duration || ''}"><br>

    <label for="ageRestriction">Aldersgrænse:</label>
    <input type="text" id="ageRestriction" name="ageRestriction" value="${movie.ageRestriction || ''}"><br>

    <label for="description">Beskrivelse:</label>
    <textarea id="description" name="description">${movie.description || ''}</textarea><br>

    <label for="genre">Genre:</label>
    <input type="text" id="genre" name="genre" value="${movie.genre || ''}"><br>

    <label for="director">Diraktør:</label>
    <input type="text" id="director" name="director" value="${movie.director || ''}"><br>
    `;
    div.append(movieinfo);
}