async function fetchBookingData() {
    try {
        const response = await fetch("https://localhost"); // replace
        const data = await response.json();

        document.getElementById("movie").value = data.movie;
        document.getElementById("time").value = data.time;
        document.getElementById("duration").value = data.duration;
        document.getElementById("theatre").value = data.theatre;
    } catch (error) {
        console.error("Error fetching booking data:", error);
    }
}

fetchBookingData();

