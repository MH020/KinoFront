const url = "https://kinobackapp-exhffhcdf8ekcaa3.northeurope-01.azurewebsites.net";
const movieButton = document.querySelector("#add-movie-button");

movieButton.addEventListener("click", () => {
    addMovie();
});


// den her laver html'en
function addMovie() {
    const movieList = document.querySelector("#movie-list"); //get div(movieList) form html.

    const movieForm = document.createElement("div"); //create new div.
    movieForm.classList.add("addMovie"); //add 'addMovie' to classlist (in html).

    //
    movieForm.innerHTML = `
        <h2>Add Movie</h2>
        <!-- set title -->
        <label for="title">Title:</label>
        <input type="text" id="title" name="title" required><br>
        
        <!-- set release year for movie -->
        <label for="releaseYear">Release Year:</label>
        <input type="number" id="releaseYear" name="releaseYear" required><br>
        
        <!-- set duration -->
        <label for="duration">Duration:</label>
        <input type="time" id="duration" name="duration" required><br>
        
        <!-- set age restriction -->
        <label for="ageRestriction">Age Restriction:</label>
        <input type="number" id="ageRestriction" name="ageRestriction" required><br>
        
        <!-- set description -->
        <label for="description">Description:</label>
        <input type="text" id="description" name="description" required><br>
        
        <!-- set genre -->
        <label for="genre">Genre:</label>
        <input type="text" id="genre" name="genre" required><br>
        
        <!-- set director -->
        <label for="director">Director:</label>
        <input type="text" id="director" name="director" required><br>
        
        <!-- set actors -->
        <label for="actors">Actors</label>
        <input type="text" id="actors" name="actors" required><br>
        
        <!-- submit button -->
        <button id="saveMovieButton">Gem</button>
    `; //end of html.

    movieList.append(movieForm);

    //get submit button to save movie:
    const saveMovieButton = document.querySelector("#saveMovieButton");
    //get values from addMovie form:
    saveMovieButton.addEventListener("click", () => {
        const title = document.querySelector("#title").value;
        const releaseYear = document.querySelector("#releaseYear").value;
        const duration = document.querySelector("#duration").value;
        const ageRestriction = document.querySelector("#ageRestriction").value;
        const description = document.querySelector("#description").value;
        const genre = document.querySelector("#genre").value;
        const director = document.querySelector("#director").value;
        const actorString = document.querySelector("#actors").value;


        //moviedata from html arranged in an array.
        const movieData = { title, releaseYear, duration, ageRestriction, description, genre, director,actorString };
        console.log(movieData);

        //post movie object from html form.
        fetch(`${url}/movie/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept':'application/json'
            },
            body: JSON.stringify(movieData) //create json file form movieData.
        })
            .then(response => response.json())
            .then(result => {
                console.log('Response Success:', result);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    });
}

function fetchAllMovies() {
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
}

fetchAllMovies();

//for each movie in movies, add a new moviecard, and add movie info.
function displayMovieText(movies) {
    if (!movies) {
        console.warn("Ingen film fundet.");
        return;
    }

    //get movieList
    const movieList = document.querySelector("#movie-list");

    movies.forEach(movie => { //for each movie in movie
        const movieInfo = document.createElement("div"); //create new div containing movie info
        movieInfo.classList.add("movie-info");

        //movie info on html
        movieInfo.innerHTML = `
            <h2>${movie.title}</h2>
            <p><strong>Udgivelsesår: </strong> ${movie.releaseYear}</p>
            <p><strong>Varighed: </strong> ${movie.duration}</p>
            <p><strong>Beskrivelse: </strong> ${movie.description}</p>
            <label><strong>Genre: </strong> ${movie.genre}</label>
            <label><strong>Instruktør: </strong> ${movie.director}</label>
            <label><strong>Aldersgrænse: </strong> ${movie.ageRestriction}</label>
            <label><strong>Skuespillere: </strong> ${movie.actorString}</label>
            
        `;

        movieList.append(movieInfo); //add movie info to movielist.
    }); //end of for eac loop.

}
