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
            <input type="search" id="phoneNumber" placeholder="Phone number...">
            <button id="saveTicketButton"> Book ticket</button>
            <hr>
        `;

        div.append(showingInfo);
    })
}

//TICKETS

document.querySelectorAll(".saveTicketButton").forEach(button => {
    button.addEventListener("click", (event) => {
        const showing = event.target.dataset.showing; // Get showing ID from button data attribute
        const phoneNumber = event.target.previousElementSibling.value; // Get phone number from input

        if (!phoneNumber) {
            alert("Please enter a phone number!");
            return;
        }

        const ticketData = { showing, phoneNumber };
        console.log(ticketData);

        fetch(`${url}/ticket/book`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(ticketData)
        })
            .then(response => response.json())
            .then(result => {
                console.log('Response Success:', result);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    });
})

/*
    //get submit button to save movie:
    const saveTicketButton = document.querySelector("#saveTicketButton");
    //get values from addMovie form:
    saveTicketButton.addEventListener("click", () => {
        const showing = document.querySelector("#showing").id;
        const phoneNumber = document.querySelector("#phoneNumber").value;

        //showingData from html arranged in an array
        const ticketData = {showing, phoneNumber};
        console.log(ticketData);

        //post ticket object from html form.
        fetch(`${url}/ticket/book`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
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
    })
        */