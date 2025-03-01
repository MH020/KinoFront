document.querySelector('#btnCreate').addEventListener('click', () =>{
    // Gather form values
    const name = document.querySelector('#name').value;
    const age = parseInt(document.querySelector('#age').value);

    // Convert the radio value to a boolean
    const active = document.querySelector('input[name="active"]:checked').value === 'true';

    const data = { name, age, active };
    console.log(data);

    fetch('http://localhost:8080/students/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept':'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        console.log('Response Success:', result);
    })
    .catch(error => {
        console.error('Error:', error);
    });
});


function logAllStudents(){
    fetch("http://localhost:8080/students/all")
        .then(response =>{
            return response.json();
        })
        .then(json => console.log(json));
}


