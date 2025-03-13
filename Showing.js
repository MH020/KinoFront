const url = "http://localhost:8080";
const azureUrl = "https://kinobackapp-exhffhcdf8ekcaa3.northeurope-01.azurewebsites.net"



fetch(`${azureUrl}/showing/all`)
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
