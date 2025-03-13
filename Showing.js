const url = "http://localhost:8080";
//const url = "http://rigtig-url";

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

//TICKETS
document.addEventListener("DOMContentLoaded", () => {
    const ticketButton = document.querySelector("#book-ticket-button");

    if (!ticketButton) {
        console.error("Element with ID 'book-ticket-button' not found.");
        return;
    }

    ticketButton.addEventListener("click", () => {
        bookTicket();
    });
});

function bookTicket() {
    const ticketList = document.querySelector("#ticket-list"); //get div(movieList) form html.

    const bookingForm = document.createElement("div"); //create new div.
    bookingForm.classList.add("bookTicket");

    // html
    bookingForm.innerHTML = `
        <h2>Book Ticket</h2>
      <label for="phoneNumber">Phone Number:</label>
      <input type="number" class="form-control" id="phoneNumber" name="phoneNumber" required>
        <!-- submit button -->
    <button type="button" class="btn btn-primary" id="book-ticket-button">Save booking</button>
    `;
    //end of html.

    ticketList.append(bookingForm);

    //get submit button to save movie:
    const saveTicketButton = document.querySelector("#saveTicketButton");
    //get values from addMovie form:
    saveTicketButton.addEventListener("click", () => {
        const showing = document.querySelector("#showing").value;
        const phoneNumber = document.querySelector("#phoneNumber").value;

        //showingData from html arranged in an array
        const ticketData = { showing, phoneNumber };
        console.log(ticketData);

        //post ticket object from html form.
        fetch(`${url}/ticket/book`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept':'application/json'
            },
            body: JSON.stringify(ticketData) //create json file form movieData.
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

// fetch en bestemt showing
function fetchShowing() {
    fetch(`${url}/showing/all`)
        .then(response => {
            if (!response.ok) {
                throw new Error("FEJL NUMBNUTS");
            }
            return response.json();
        })
        .then(movies => {
            console.log(movies);
            displayShowingText(movies);
        })
        .catch(err => {
            console.error("error:", err);
        });
}
fetchShowing();

function displayShowingText(showing) {
    if (!showing) {
        console.warn("Ingen showings fundet.");
        return;
    }

    //get showingList
    const showingList = document.querySelector("#showing-list");

    showing.forEach(showing => { //for each movie in movie
        const showingInfo = document.createElement("div"); //create new div containing movie info
        showingInfo.classList.add("ticket-info");

        showingInfo.innerHTML = `
            <h2>${showing.movie.title}</h2>
            <p class="hide"> ${showing.id}</p>
            <p><strong>Date:</strong> ${showing.date}</p>
            <p><strong>Time:</strong> ${showing.time}</p>
            <p><strong>Duration:</strong> ${showing.movie.duration}</p>
            <p><strong>Theatre:</strong> ${showing.theatre.id}</p>
        `;
        showingList.append(showingInfo);
    }); //end of for eac loop.
}