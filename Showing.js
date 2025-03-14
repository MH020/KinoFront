//const url = "http://localhost:8080";
const url = "https://kinobackapp-exhffhcdf8ekcaa3.northeurope-01.azurewebsites.net"

fetch(`${url}/showing/all`)
    .then(response => {
        if (!response.ok) {
            throw new Error("FEJL NUMBNUTS");
        }
        return response.json();
    })
    .then(showing => {
        console.log(showing);
        displayMovieText(showing);
    })
    .catch(err => {
        console.error("Der opstod en fejl:", err);
    });

function displayMovieText(showing) {
    if (!showing) {
        console.warn("Ingen film fundet.");
        return;
    }

    const div = document.querySelector("#showing-list");


    showing.forEach(showing => {
        const showingInfo = document.createElement("div");
        showingInfo.classList.add("showingInfo");

        showingInfo.innerHTML = `
            <h2>Film: ${showing.movie.title}</h2>
            <p><strong>Dato:</strong> ${showing.date}</p>
            <p><strong>Tid:</strong> ${showing.time}</p>
            <p><strong>Varighed:</strong> ${showing.movie.duration}</p>
            <p><strong>Aldersgrænse:</strong> ${showing.movie.ageRestriction}+</p>
            <p><strong>Instruktør:</strong> ${showing.movie.director}</p>
            <p><strong>Genre ID:</strong> ${showing.movie.genre}</p>
            <p><strong>Beskrivelse:</strong> ${showing.movie.description}</p>
            <p><strong>Biograf:</strong> Teater #${showing.theatre.id}</p>
            <p><strong>Ledige sæder:</strong> ${showing.theatre.seats}</p>
            <hr>
        `;

        div.append(showingInfo);
    })
}

/* Creation Showing */
const body = document.querySelector("body");

//_______________create a showing________________
document.getElementById('create-showing-form-button').addEventListener('click', function() {
    const popupForm = document.getElementById('popupForm');
    const overlay = document.getElementById('overlay');

    popupForm.innerHTML = `
        <form id="showingForm">
            <label for="time">Tid:</label>
            <input type="time" id="time" name="time" required><br>
            <label for="date">Date:</label>
            <input type="date" id="date" name="date" required><br>
            <label for="movieId">Movie:</label>
            <input type="number" id="movieId" name="movieId" required><br>
            <label for="theatreId">Theatre:</label>
            <input type="number" id="theatreId" name="theatreId" required><br>
            <button type="submit">Opret</button>
            <button type="button" id="closePopup">Luk</button>
        </form>
    `;

    popupForm.style.display = 'block';
    overlay.style.display = 'block';

    document.getElementById('closePopup').addEventListener('click', function() {
        popupForm.style.display = 'none';
        overlay.style.display = 'none';
    });

    document.getElementById('showingForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const timeInput = document.getElementById('time').value;
        const date = document.getElementById('date').value;
        const movieId = document.getElementById('movieId').value;
        const theatreId = document.getElementById('theatreId').value;

        const time = timeInput ? `${timeInput}:00` : '';
        if (!timeInput) {
            alert('Tid skal være i formatet HH:MM');
            return;
        }

        const data = {
            time: time,
            date: date,
            movie: { id: movieId },
            theatre: { id: theatreId }
        };

        fetch(`${url}/showing/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Noget gik galt med anmodningen');
                }
            })
            .then(data => {
                console.log('Succes:', data);
                alert('Showing oprettet succesfuldt!');
                popupForm.style.display = 'none';
                overlay.style.display = 'none';
            })
            .catch((error) => {
                console.error('Fejl:', error);
                alert('Fejl ved oprettelse af showing');
            });
    });
});