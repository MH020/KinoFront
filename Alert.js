const searchTicketsButton = document.querySelector("#search-tickets-button");
const customerTicketsModal = document.querySelector("#customer-tickets-modal");
const closeButton = document.querySelector("#close-button");

customerTicketsModal.style.display = "none";

searchTicketsButton.addEventListener("click", ()=>{
    customerTicketsModal.style.display = "inline";
});

closeButton.addEventListener("click", ()=>{
    customerTicketsModal.style.display= "none";
})
