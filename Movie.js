const url = "http://localhost:8080";

const movieButton = document.querySelector("#addMovieButton");
movieButton.addEventListener("click", () => {
    addMovie();
    fetchActors();
});

function fetchActors() {
    fetch(`${url}/actor/all`)
        .then(response => {
            return response.json();
        })
        .then(actors => populateActors(actors))
        .then(json => console.log(json));
}
function populateActors(actors) {
    const actorList = document.querySelector("#actorDropdown");
    actors.forEach(actor => {
        const option  = document.createElement("option");
        //option.value = actor.id;
        option.innerText = actor.fullName;
            console.log(actor)
        actorList.appendChild(option);
    });
    console.log(actors);
}
// den her laver html'en
function addMovie() {
    const div = document.querySelector("#movie-list");

    const movieForm = document.createElement("div");
    movieForm.classList.add("addMovie");

    movieForm.innerHTML = `
    <h2>Add Movie</h2>
    <label for="title">Title:</label>
    <input type="text" id="title" name="title" required><br>
    
    <label for="releaseYear">Release Year:</label>
    <input type="number" id="releaseYear" name="releaseYear" required><br>
    
    <label for="duration">Duration:</label>
    <input type="time" id="duration" name="duration" required><br>
    
    <label for="ageRestriction">Age Restriction:</label>
    <input type="number" id="ageRestriction" name="ageRestriction" required><br>
    
    <label for="description">Description:</label>
    <input type="text" id="description" name="description" required><br>
    
    <label for="genre">Genre:</label>
    <input type="text" id="genre" name="genre" required><br>
    
    <label for="director">Director:</label>
    <input type="text" id="director" name="director" required><br>
    
     <label for="actorDropdown">Actors:</label>
     <select id="actorDropdown" name="actors" multiple required></select><br>
    
    <button id="saveMovieButton">Gem</button>
    `;
    div.append(movieForm);

    const saveMovieButton = document.querySelector("#saveMovieButton");
    saveMovieButton.addEventListener("click", () => {
        const title = document.querySelector("#title").value;
        const releaseYear = document.querySelector("#releaseYear").value;
        const duration = document.querySelector("#duration").value;
        const ageRestriction = document.querySelector("#ageRestriction").value;
        const description = document.querySelector("#description").value;
        const genre = document.querySelector("#genre").value;
        const director = document.querySelector("#director").value;
        const actorDropdown = document.querySelector("#actorDropdown");
        const selectedActors = Array.from(actorDropdown.selectedOptions).map(option => option.value);

        const data = { title, releaseYear, duration, ageRestriction, description, genre, director, actors: selectedActors };
        console.log(data);

        fetch(`${url}/movie/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept':'application/json'
            },
            body: JSON.stringify(data)
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


