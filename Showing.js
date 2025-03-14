const url = "http://localhost:8080";
//const azureUrl = "https://kinobackapp-exhffhcdf8ekcaa3.northeurope-01.azurewebsites.net";

// Fetch showings data
fetch(`${url}/showing/all`)
    .then(response => {
        if (!response.ok) {
            throw new Error("Error fetching showings");
        }
        return response.json();
    })
    .then(showings => {
        console.log(showings);
        displayMovieText(showings);
    })
    .catch(err => {
        console.error("An error occurred:", err);
    });

// Function to display each showing's information
function displayMovieText(showings) {
    if (!showings) {
        console.warn("No movies found.");
        return;
    }

    const div = document.querySelector("#showing-list");

    showings.forEach(showing => {
        const showingInfo = document.createElement("div");
        showingInfo.classList.add("showingInfo");

        showingInfo.innerHTML = `
      <h2>Movie: ${showing.movie.title}</h2>
      <p><strong>Date:</strong> ${showing.date}</p>
      <p><strong>Time:</strong> ${showing.time}</p>
      <p><strong>Duration:</strong> ${showing.movie.duration}</p>
      <p><strong>Age restriction:</strong> ${showing.movie.ageRestriction}+</p>
      <p><strong>Director:</strong> ${showing.movie.director}</p>
      <p><strong>Genre ID:</strong> ${showing.movie.genre}</p>
      <p><strong>Description:</strong> ${showing.movie.description}</p>
      <p><strong>Cinema:</strong> Theater #${showing.theatre.id}</p>
      <p><strong>Seats available:</strong> ${showing.theatre.seats}</p>
      <input type="search" id="phoneNumber-${showing.id}" placeholder="Phone number...">
      <button class="saveTicketButton" data-showing="${showing.id}">Book ticket</button>
      <hr>
    `;

        div.appendChild(showingInfo);
    });
}

// Attach event listener using event delegation after the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#showing-list").addEventListener("click", (event) => {
        if (event.target && event.target.classList.contains("saveTicketButton")) {
            const showingId = event.target.dataset.showing;
            const phoneNumberInput = document.querySelector(`#phoneNumber-${showingId}`);
            const phoneNumber = phoneNumberInput ? phoneNumberInput.value : "";

            if (!phoneNumber) {
                alert("Please enter a phone number!");
                return;
            }

            const ticketData = { showing: Number (showingId), phoneNumber: Number (phoneNumber) };
            console.log("Booking ticket with data:", ticketData);

            fetch(`${url}/ticket/book`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(ticketData)
            })
                .then(response => {
                    console.log(response.body)
                })
                .then(result => {
                    console.log('Ticket booked successfully:', result);

                    //seat count stuff
                    const showingElement = event.target.closest(".showingInfo");

                    if (showingElement) {
                        // Find the <p> element containing "Seats available:"
                        const seatsElement = Array.from(showingElement.querySelectorAll("p"))
                            .find(p => p.textContent.includes("Seats available:"));

                        if (seatsElement) {
                            // Extract current seat count and update it
                            const currentSeats = parseInt(seatsElement.textContent.replace("Seats available: ", "").trim());
                            seatsElement.textContent = `Seats available: ${currentSeats - 1}`;
                        }
                    }
                    })
                .catch(error => {
                    console.error('Error booking ticket:', error);
                });
        }
    })
})