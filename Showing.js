const url = "http://localhost:8080";

const body = document.querySelector("body");
//showingList
const showingListDiv = document.querySelector("#showing-list");


//fetch all showings
fetch(`${url}/showing/all`)
    .then(response => { //error handling.
        if (!response.ok) {
            throw new Error("FEJL NUMBNUTS");
        }
        return response.json(); //return json object.
    })
    .then(showing => { //display showing on page
        console.log(showing);
        displayMovieText(showing);
    })
    .catch(err => { //error handling
        console.error("Der opstod en fejl:", err);
    });

function displayMovieText(showing) {
    if (!showing) { //error handling
        console.warn("Ingen film fundet.");
        return;
    }
    //for each showing, add showing and movie attributes
    showing.forEach(showing => {
        const showingInfo = document.createElement("div");
        showingInfo.classList.add("showingInfo");

        showingInfo.innerHTML = `
            <hidden> ${showing.id} </hidden> <!-- showing id -->
            <!-- <h2>Film: ${showing.movie.title}</h2> -->
            <p><strong>Date:</strong> ${showing.date}</p>
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
        addSearchBar(`search-ticket-for-showing-${showing.id}`, showingInfo);
        showingListDiv.append(showingInfo);
    });
}

function addSearchBar(buttonId, htmlElement){
    const searchBarDiv = document.createElement("div");
    searchBarDiv.classList.add("search-wrapper");

    //add label and input to searchbarDiv.
    searchBarDiv.innerHTML = `
        <label for="ticket-search" > search tickets</label>
        <input type="search" id="ticket-search" placeholder="phonenumber..."> `;

    //create and add button to search bar.
    const searchBarButton = document.createElement("button");
    searchBarButton.id = buttonId; //"search-tickets-button";
    searchBarButton.innerText = "search";
    searchBarDiv.append(searchBarButton);

    //add searchbar to html body.
    htmlElement.append(searchBarDiv);
}

addSearchBar("search-showings-button", body); //addSearchBar to body with buttonId seargh-tickets-button.


