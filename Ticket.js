

//fetch tickets, don't delete.
/*
let ticketList = [];

fetch(url + "/ticket/all")
    .then(response =>{
        if (response.ok){
            return response.json();
        }else{
            console.log ("tickets not fetched succesfully");
        }
    }).then(data => {
        ticketList = data.map(ticket => { //put tickets into ticketList.
            const ticketCard = document.createElement("div");
            ticketCard.id = `ticket-card-${ticket.id}`;
            ticketCard.innerText = ticket.phoneNumber;
            console.log(ticket);
            return {showing: ticket.showing, phoneNumber: ticket.phoneNumber, htmlElement: ticketCard}; //define attributes in ticket object.
        });
}).catch(error => console.log ("error in Ticket: " + error));
*/


