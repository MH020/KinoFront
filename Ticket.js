const url = "http://localhost:8080";
//const url = "http://rigtig-url";

fetch(`${url}/ticket/tickets`)
    .then(response => {
        if (!response.ok) {
            throw new Error("FEJL NUMBNUTS");
        }
        return response.json();
    })
    .then(tickets => {
        console.log(tickets);
        displayTicket(tickets);
    })
    .catch(err => {
        console.error("error", err);
    });

function displayTicket(tickets) {
    if (!tickets) {
        console.warn("no ticks found.");
        return;
    }

    const div = document.querySelector("#showing-list");

    tickets.forEach(ticket => {
        const ticketInfo = document.createElement("div");
        ticketInfo.classList.add("ticketInfo");

        ticketInfo.innerHTML = `
            <h2>Movie: ${ticket.movie.title}</h2>
            <p><strong>Date:</strong> ${ticket.date}</p>
            <p><strong>Time:</strong> ${ticket.time}</p>
            <p><strong>Duration:</strong> ${ticket.movie.duration}</p>
            <p><strong>Theatre:</strong> #${ticket.theatre.id}</p>
            <p><strong>Phone Number:</strong> #${ticket.phoneNumber}</p>
            <hr>
        `;

        div.append(ticketInfo);
    })
}

//getting movie information for the booking form
function fetchMovieInfo(){

}