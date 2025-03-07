const url = "http://localhost:8080";
//const url ="http://rigtig-url";

let movieList = [];

fetch(`${url}/movie/all`) .then(function (reponse) {
    if (!reponse.ok) {
        throw new Error("FEJL NUMBNUTS")
    } else {
        const movies = reponse.json()
        //movieList.add(movies);
        //det gik igennem.
        console.log(movies)
        //displayMovies(movies)
        displayMovieText(movies);

    }
}) .catch(function (err) {

});

function displayMovieText(movies){
    const movieText = document.createElement("p");
    movieText.innerText = movies.data[0].title;

    const div = document.querySelector("#movie-list");
    div.append(movieText);
}

function displayMovies(movies) {
    const movieListElement = document.getElementById('movie-list');
    movieListElement.innerHTML = ''; // Clear previous content

    movies.forEach(movie => {
        const movieElement = document.createElement('div');
        movieElement.classList.add('movie');
        movieElement.innerHTML = `
            <h2>${movie.title}</h2>
            <p>Director: ${movie.director}</p>
            <p>Release Year: ${movie.releaseYear}</p>
            <p>Duration: ${movie.duration}</p>
            <p>Genre: ${movie.genre}</p>
            <p>Description: ${movie.description}</p>
        `;
        movieListElement.appendChild(movieElement);
    });
}



