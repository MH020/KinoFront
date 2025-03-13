const url = "http://localhost:8080";

const body = document.querySelector("body");
//showingList
const showingListDiv = document.querySelector("#showing-list");

//addSearchBar("search-showings-button", body); //addSearchBar to body with buttonId seargh-tickets-button.
const showingSearchBar = document.querySelector("#showing-search-input");//"#showing-search");

//fetch all showings
fetch(`${url}/showing/all`)
    .then(response => { //error handling.
        //const azureUrl = "https://kinobackapp-exhffhcdf8ekcaa3.northeurope-01.azurewebsites.net"

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

getSearchBarInput(showingSearchBar);

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

        addSearchTicketBar(showing.id, showingCard); //add search bar to showingCard.
       // getSearchBarInput(document.querySelector("#ticket-search-" + showing.id));
        showingListDiv.append(showingCard);
    });
}

function addSearchTicketBar(showingId, htmlElement){
    const searchBarDiv = document.createElement("div");
    searchBarDiv.classList.add("search-wrapper");

    //add label and input to searchbarDiv.
    searchBarDiv.innerHTML = `
        <label id="ticket-search-${showingId}-label" > search tickets</label>
        <input type="search" id="ticket-search-${showingId}-input" placeholder="phonenumber...">` ;

    //create and add button to search bar.
    const searchBarButton = document.createElement("button");
    searchBarButton.id = `search-showing-${showingId}-tickets-button`; //"search-tickets-button";
    searchBarButton.innerText = "search";
    searchBarDiv.append(searchBarButton);

    //add searchbar to ShowingCard.
    htmlElement.append(searchBarDiv);
    //searchTicketList.push(searchBarDiv);
}

function createDateCards(showing){
    let dateCard = document.querySelector(`#date-card-${showing.date}`); //get datecard with date of showing.
    if (dateCard == null){ //if datecard doesn't exist, create new.
        dateCard = document.createElement("div")
        dateCard.id =`date-card-${showing.date}`

        const dateCardText = document.createElement("h3");
        dateCardText.innerText = showing.date;
        dateCard.append(dateCardText);
        showingListDiv.append(dateCard);
    }
}


function fetchTicketsByPhoneNumber(showing, phoneNumber){
    fetch(`${url}/showing/${showing.id}/phoneNumber/${phoneNumber}`)
        .then(response => {
            if (!response.ok){
                console.log("error in fetchTicketsByPhoneNumber")
            }
            return response.json();

        }).then(data => {
            console.log(data.value);
            return data.value;
    });
}

function getSearchBarInput(searchBarInput){
    searchBarInput.addEventListener("input", (e) => {
        const userInput = e.target.value;
        console.log(userInput);
        //return e.target.value;
    });
}

/*
function testSearchBar(){
    const searchWrapper = document.createElement("div");
    searchWrapper.id = "search-wrapper";
    body.append(searchWrapper);

    const searchBar = document.createElement("div");
    searchBar.id = "search-bar";

    const searchLabel = document.createElement("label");
    searchLabel.id = "search-label";
    searchLabel.for = "search-input";
    searchLabel.innerText = "Search?";
    searchBar.append(searchLabel);

    const searchInput = document.createElement("input");
    searchInput.type = "search"; //type
    searchInput.id = "search-input";
    searchInput.placeholder ="...";
    searchBar.append(searchInput);

    const searchButton = document.createElement("button");
    searchButton.id= "search-button";
    searchButton.innerText = "Search"
    searchBar.append(searchButton);

    searchWrapper.append(searchBar);
    body.append(body);


    getSearchBarInput()

}*/

//const ticketSearchBarInput = document.querySelector("#ticket-search");

