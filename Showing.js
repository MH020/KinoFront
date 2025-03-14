const url = "http://localhost:8080";

const body = document.querySelector("body");
//showingList
const showingListDiv = document.querySelector("#showing-list");

//addSearchBar("search-showings-button", body); //addSearchBar to body with buttonId seargh-tickets-button.
const showingSearchBar = document.querySelector("#showing-search-input");//"#showing-search");

//ticket modal
const customerTicketsModal = document.querySelector("#customer-tickets-modal");
const closeTicketsModalButton = document.querySelector("#close-tickets-modal-button");
const searchTicketsButtonList = [];


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

        const ticketSearchInput = addSearchTicketBar(showing.id, showingCard); //add search bar to showingCard.
        console.log(showing.id);

        //const ticketSearchInput = document.querySelector("#ticket-search-" + showing.id) ;
        //getSearchBarInput(ticketSearchInput);

        showingListDiv.append(showingCard);

        const submitButton = document.querySelector(`#search-${showing.id}-tickets-button`);
        //submitButton.type = "submit";

        //  console.log("før modalButtonListener");
        modalButtonListener(showing, submitButton, ticketSearchInput);
        // console.log("efter modalButtonListenre");
    });


}

//add html for ticket searchbar.
function addSearchTicketBar(showingId, htmlElement){
    const searchBarDiv = document.createElement("div");
    searchBarDiv.classList.add("search-wrapper");

    //create label and input for search bar
    const searchBarLabel = document.createElement("label");
    searchBarLabel.for=`ticket-search-${showingId}`;
    const searchBarInput = document.createElement("input");
    searchBarInput.id = `ticket-search-${showingId}`;
    searchBarInput.type = "search";
    searchBarInput.placeholder = "phonenumber...";

    //create and add button to search bar.
    const searchBarButton = document.createElement("input");
    searchBarButton.id = `search-${showingId}-tickets-button`; //"search-tickets-button";
    searchBarButton.innerText = "search";
    searchBarButton.type = "submit";
    searchTicketsButtonList.push(searchBarButton); //add button to list, so we can add eventlisteners later.

    //add label, input and button to searchBarDiv
    searchBarDiv.append(searchBarLabel);
    searchBarDiv.append(searchBarInput);
    searchBarDiv.append(searchBarButton);

    //add searchbar to ShowingCard.
    htmlElement.append(searchBarDiv);

    return searchBarInput;
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
    console.log("fetch phoneNumber: " + phoneNumber);

    fetch(`${url}/showing/${showing.id}/tickets/${phoneNumber}`)
        .then(response => {
            if (!response.ok){
                console.log("error in fetchTicketsByPhoneNumber")
            }
            console.log ("response OK");
            return response.json();

        }).then(data => {
            console.log("tickets for phoneNumber: "  + data);
            return data;
    }).catch((error) => console.log("fejl i fetchTicketsByPhoneNumber: " + error));
}


function getSearchBarInput(searchBarInput){
    searchBarInput.addEventListener("input", (e) => {
        const userInput = e.target.value;
        console.log(userInput)
        return userInput;
    });
}

const ticketModalText = document.querySelector("#ticket-modal-text");
ticketModalText.innerText = "Hello World!";

//display modal
function modalButtonListener(showing, button, searchBar) {
    const phoneNumber = getSearchBarInput(searchBar);

    button.addEventListener("click", displayModal(phoneNumber, showing));
}

function displayModal(phoneNumber, showing){
    console.log("display modal");
    //console.log("search bar: " + searchBar);
    console.log (phoneNumber);
    console.log("phoneNumber from searchBar: " + phoneNumber);
    //console.log(phoneNumber);


    customerTicketsModal.style.display = "inline-block";

    const customerTickets = fetchTicketsByPhoneNumber(showing, phoneNumber);
    ticketModalText.innerText = customerTickets + "ticket(s) for " + showing.name;

    //console.log("button: " + button + "\nphoneNumberInput: " + phoneNumberInput + "\ne.target: " + eTarget + "\nphoneNumber: " + phoneNumber + "\nTickets bought: " + customerTickets);
    console.log("modal text: " + ticketModalText.innerText);

    console.log("end of modal");
}
//close modal
closeTicketsModalButton.addEventListener("click", ()=>{
    customerTicketsModal.style.display= "none";
});

