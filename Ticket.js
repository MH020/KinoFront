const searchTicketsButton = document.querySelector("search-ticket-for-showing-1");
const customerTicketsModal = document.querySelector("#customer-tickets-modal");
const closeTicketsModalButton = document.querySelector("#close-tickets-modal-button");

//display modal
searchTicketsButton.addEventListener("click", ()=>{
    customerTicketsModal.style.display = "inline-block";
});

//close modal
closeTicketsModalButton.addEventListener("click", ()=>{
    customerTicketsModal.style.display= "none";
});



