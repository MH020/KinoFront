const url = "http://localhost:8080";
//const url = "http://rigtig-url";

const body = document.querySelector("body");

//_______________create a showing________________
document.getElementById('showingForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const timeInput = document.getElementById('time').value;
    const date = document.getElementById('date').value;
    const movieId = document.getElementById('movieId').value;
    const theatreId = document.getElementById('theatreId').value;

    // Formater tiden til --:--:-- format
    const time = timeInput ? `${timeInput}:00` : '';
    if(!timeInput) {
        alert('Tid skal være i formatet HH:MM');
        return;
    }


    const data = {
        time: time,
        date: date,
        movie: { id: movieId },
        theatre: { id: theatreId }
    };

    fetch('http://localhost:8080/showing/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Noget gik galt med anmodningen');
        }
    })
    .then(data => {
        console.log('Succes:', data);
        alert('Showing oprettet succesfuldt!');
    })
    .catch((error) => {
        console.error('Fejl:', error);
        alert('Fejl ved oprettelse af showing');
    });
})



// function addShowing() {
//     const createShowDIV = document.createElement("div");
//     createShowDIV.id = "createShowing";
//     createShowDIV.innerHTML = `
//     <h1>Opret en ny showing</h1>
//     <form id="showingForm">
//         <label htmlFor="time">Tid:</label>
//         <input type="time" id="time" name="time" required/>
//         <br/>
//         <label htmlFor="date">Date:</label>
//         <input type="date" id="date" name="date" required/>
//         <br/>
//         <label htmlFor="movieId">Movie id:</label>
//         <input type="number" id="movieId" name="movieId" required/>
//         <br/>
//         <label htmlFor="theatreId">Theatre id:</label>
//         <input type="number" id="theatreId" name="theatreId" required/>
//         <br/>
//         <button type="submit">Opret</button>
//     </form>`
//     body.append(createShowDIV);
// }
// // addShowing();
// const button = document.querySelector("#create-showing-form-button")
// button.addEventListener("click", () => addShowing())
