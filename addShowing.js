const createUrl = "http://localhost:8080";
// const url = "h";

const body = document.querySelector("body");

//_______________create a showing________________
document.getElementById('create-showing-form-button').addEventListener('click', function() {
    const popupForm = document.getElementById('popupForm');
    const overlay = document.getElementById('overlay');

    popupForm.innerHTML = `
        <form id="showingForm">
            <label for="time">Tid:</label>
            <input type="time" id="time" name="time" required><br>
            <label for="date">Date:</label>
            <input type="date" id="date" name="date" required><br>
            <label for="movieId">Movie:</label>
            <input type="number" id="movieId" name="movieId" required><br>
            <label for="theatreId">Theatre:</label>
            <input type="number" id="theatreId" name="theatreId" required><br>
            <button type="submit">Opret</button>
            <button type="button" id="closePopup">Luk</button>
        </form>
    `;

    popupForm.style.display = 'block';
    overlay.style.display = 'block';

    document.getElementById('closePopup').addEventListener('click', function() {
        popupForm.style.display = 'none';
        overlay.style.display = 'none';
    });

    document.getElementById('showingForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const timeInput = document.getElementById('time').value;
        const date = document.getElementById('date').value;
        const movieId = document.getElementById('movieId').value;
        const theatreId = document.getElementById('theatreId').value;

        const time = timeInput ? `${timeInput}:00` : '';
        if (!timeInput) {
            alert('Tid skal være i formatet HH:MM');
            return;
        }

        const data = {
            time: time,
            date: date,
            movie: { id: movieId },
            theatre: { id: theatreId }
        };

        fetch(`${createUrl}/showing/create`, {
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
                popupForm.style.display = 'none';
                overlay.style.display = 'none';
            })
            .catch((error) => {
                console.error('Fejl:', error);
                alert('Fejl ved oprettelse af showing');
        });
    });
});
