const url = "http://localhost:8080";

const body = document.querySelector("body");
//showingList
const showingListDiv = document.querySelector("#showing-list");


//addSearchBar("search-showings-button", body); //addSearchBar to body with buttonId seargh-tickets-button.

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
        createDateCards(showing);

        const showingCard = document.createElement("div");
        showingCard.classList.add("showing-card");

        showingCard.innerHTML = `
            <!-- <hidden> ${showing.id} </hidden> showing id -->
            <a href="movie.html" > <h2>Film: ${showing.movie.title}</h2> </a>
           <!--  <p><strong>Date:</strong> ${showing.date}</p> -->
            <p><strong>Tid:</strong> ${showing.time}</p>
          <!--   <p><strong>Varighed:</strong> ${showing.movie.duration}</p> -->
            <p><strong>Aldersgrænse:</strong> ${showing.movie.ageRestriction}+</p>
          <!--  <p><strong>Instruktør:</strong> ${showing.movie.director}</p> 
            <p><strong>Genre ID:</strong> ${showing.movie.genre}</p>
            <p><strong>Beskrivelse:</strong> ${showing.movie.description}</p> -->
            <p><strong>Biograf:</strong> Teater #${showing.theatre.id}</p>
            <p><strong>Ledige sæder:</strong> ${showing.theatre.seats}</p>`;
        addSearchBar(`search-ticket-for-showing-${showing.id}`, showingCard); //add search bar to showingCard.
        showingListDiv.append(showingCard);
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

function createDateCards(showing){
    let dateCard = document.querySelector(`#date-card-${showing.date}`);
    if (dateCard == null){
        dateCard = document.createElement("div")
        dateCard.id =`date-card-${showing.date}`

        const dateCardText = document.createElement("h3");
        dateCardText.innerText = showing.date;
        dateCard.append(dateCardText);
        showingListDiv.append(dateCard);
    }
}

//const ticketSearchBarInput = document.querySelector("#ticket-search");

