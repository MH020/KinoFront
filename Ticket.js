const url = "http://localhost:8080";
const ticketButton = document.querySelector("#book-ticket-button");

ticketButton.addEventListener("click", () => {
    bookTicket();
});

// den her laver html'en
function bookTicket() {
    const ticketList = document.querySelector("#ticket-list"); //get div(movieList) form html.

    const bookingForm = document.createElement("div"); //create new div.
    bookingForm.classList.add("bookTicket");

    //
    bookingForm.innerHTML = `
        <h2>Book Ticket</h2>
      <label for="movie">Movie:</label>
      <input type="text" class="form-control" id="movie" name="movie" disabled>

      <label for="date">Date:</label>
      <input type="date" class="form-control" id="date" name="date" disabled>

      <label for="time">Time:</label>
      <input type="time" class="form-control" id="time" name="time" disabled>

      <label for="duration">Duration:</label>
      <input type="time" class="form-control" id="duration" name="duration" disabled>

      <label for="theatre">Theatre:</label>
      <input type="text" class="form-control" id="theatre" name="theatre" disabled>

      <label for="phoneNumber">Phone Number:</label>
      <input type="number" class="form-control" id="phoneNumber" name="phoneNumber" required>
        
        <!-- submit button -->
    <button type="button" class="btn btn-primary" id="book-button">Book</button>
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

//for each movie in movies, add a new moviecard, and add movie info.
function displayTicketText(tickets) {
    if (!tickets) {
        console.warn("Ingen film fundet.");
        return;
    }

    //get movieList
    const ticketList = document.querySelector("#ticket-list");

    tickets.forEach(ticket => { //for each movie in movie
        const ticketInfo = document.createElement("div"); //create new div containing movie info
        ticketInfo.classList.add("movie-info");

        //movie info on html
        ticketInfo.innerHTML = `
            <h2>${movie.title}</h2>
            <p><strong>Udgivelsesår: </strong> ${movie.releaseYear}</p>
            <p><strong>Varighed: </strong> ${movie.duration}</p>
            <p><strong>Beskrivelse: </strong> ${movie.description}</p>
            <label><strong>Genre: </strong> ${movie.genre}</label>
            <label><strong>Instruktør: </strong> ${movie.director}</label>
            <label><strong>Aldersgrænse: </strong> ${movie.ageRestriction}</label>
            <label><strong>Skuespillere: </strong> ${movie.actorString}</label>
        `;
        ticketList.append(ticketInfo);
    }); //end of for eac loop.
}