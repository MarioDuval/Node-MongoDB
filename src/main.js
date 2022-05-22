
function setFormMessage(formElement, type, message) {
    const messageElement = formElement.querySelector(".form__message");

    messageElement.textContent = message;
    messageElement.classList.remove("form__message--success", "form__message--error");
    messageElement.classList.add(`form__message--${type}`);
}

function setInputError(inputElement, message) {
    inputElement.classList.add("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = message;
}

function clearInputError(inputElement) {
    inputElement.classList.remove("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = "";
}

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("#login");
    const createAccountForm = document.querySelector("#createAccount");

    document.querySelector("#linkCreateAccount").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.add("form--hidden");
        createAccountForm.classList.remove("form--hidden");
    });

    document.querySelector("#linkLogin").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.remove("form--hidden");
        createAccountForm.classList.add("form--hidden");
    });

    loginForm.addEventListener("submit", e => {
        e.preventDefault();

        // Perform your AJAX/Fetch login
        fetch_login();
        window.location.href = "movies.html";

        setFormMessage(loginForm, "error", "Invalid username/password combination");
    });

    createAccountForm.addEventListener("submit", e => {
        e.preventDefault();

        // Perform your AJAX/Fetch login
        fetch_register();

    });

    document.querySelectorAll(".form__input").forEach(inputElement => {
        inputElement.addEventListener("blur", e => {
            if (e.target.id === "signupUsername" && e.target.value.length > 0 && e.target.value.length < 10) {
                setInputError(inputElement, "Username must be at least 10 characters in length");
            }
        });

        inputElement.addEventListener("input", e => {
            clearInputError(inputElement);
        });
    });
});


async function fetch_login() {
    // username":"spyder@dominio.es", "password":"man$Super1"

    const user = document.getElementById("user").value;
    const password = document.getElementById("pass").value;
    // const form = {
    //     user: document.getElementById("user").value,
    //     password: document.getElementById("pass").value,
    // };

    // console.log(user, password)
    const response = await fetch('http://localhost:3011/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: user,
            password: password
            // username: form.user.value,
            // password: form.password.value,
        }),
    });

    const data = await response.json();

    console.log(data);
}

async function fetch_register() {
    // username":"spyder@dominio.es", "password":"man$Super1"

    const user = document.getElementById("signupUsername").value;
    const password = document.getElementById("passReg").value;
    const email = document.getElementById("mail").value;
    console.log(user, password, email)

    const response = await fetch('http://localhost:3011/users/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: user,
            password: password,
            email: email
        }),
    });

    const data = await response.json();

    console.log(data);
}

async function fetch_acive() {
    // username":"spyder@dominio.es", "password":"man$Super1"

    const active = document.getElementById("active").value;

    const response = await fetch('http://localhost:3011/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: user,
            password: password
            // username: form.user.value,
            // password: form.password.value,
        }),
    });

    const data = await response.json();

    console.log(data);
}

async function myFunction1(){
    const response = await fetch('http://localhost:3011/movies/');
    const data =  await response.json();
    console.log(data);
    let html ='';
    data.forEach (e => html += section(e))
    $('#data').html(html)
}

async function myFunction2(){
    const response = await fetch("http://localhost:3011/movies/4");
    let data = await response.json();

    console.log(data);
    let html ='';
    data.forEach (e => html += section(e))
    $('#data').html(html)
}

async function myFunction3(){
    let newMovie = {
        "id": 10,
        "title": "Dances with Wolves",
        "genres": [
            "Adventure", "Western ", "Drama"
        ],
        "year": 1990,
        "director": "Kevin Costner",
        "actors": [
            "Kevin Costner",
            "Mary McDonnell",
            "Graham Greene",
            "Rodney A. Grant"
        ]
    }
    const response = await fetch("http://localhost:3011/movies/add", {
        method: 'PUT',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newMovie),
    });
    let data = await response.json();

    console.log(data);
    let html ='';
    data.forEach (e => html += section(e))
    $('#data').html(html)
}

async function myFunction4() {
    const updateMovie = {
        "id": 3,
        "title": "El padrino parte II",
        "genres": [
            "Crime", "Drama"
        ],
        "year": 1994,
        "director": "Frank Darabont",
        "actors": [
            "Tim Robbins",
            "Ricard el profe",
            "Bob Gunton",
            "William Sadler",
            "Clancy Brown",
            "Gil Bellows"
        ]
    }
    const response = await fetch('http://localhost:3011/movies/update', {
        method: 'PUT',
        body: JSON.stringify(updateMovie), 
        headers: {
            'Content-Type': 'application/json'
        }
    }
    );
    const data = await response.json();
    console.log(data);
    let html = '';
    data.forEach(e => html += section(e))
    $('#data').html(html)
}

async function myFunction5() {
    const response = await fetch('http://localhost:3011/movies/10', {
        method: 'DELETE'
    });
    const data = await response.json();
    console.log(data);
    let html = '';
    data.forEach(e => html += section(e))
    $('#data').html(html)
}

function section (movie){
    return `
    <br>
    <tr>
        <td>
            <h1 id="title">ID: ${movie.id}</h1>
            <h1 id="title">Pelicula: ${movie.title}</h1>
            <h2 id="content">Director: ${movie.director}</h4>
            <h2 id="content">Fecha de lanzamiento: ${movie.year}</h4>
        </td>
    </tr>`;
}
