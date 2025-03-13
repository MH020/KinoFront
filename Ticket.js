const url = "http://localhost:8080";

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
            <hidden><p>${showing.id}</p></hidden>
            <p><strong>Date</strong> ${showing.date}</p>
            <p><strong>Time</strong> ${showing.time}</p>
            <p><strong>Duration</strong> ${showing.movie.duration}</p>
            <p><strong>Theatre</strong> ${showing.theatre.id}</p>
        `;
        showingList.append(showingInfo);
    }); //end of for eac loop.
}