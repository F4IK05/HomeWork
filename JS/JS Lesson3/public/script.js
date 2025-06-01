const loginTab = document.getElementById('loginTab');
const registerTab = document.getElementById('registerTab');
const switcher = document.getElementById('switcher');

const errorBox = document.getElementById("errorBox");

loginTab.addEventListener('click', () => {
    loginTab.classList.add('active');
    registerTab.classList.remove('active');
    loginForm.classList.add('active');
    registerForm.classList.remove('active');
});

registerTab.addEventListener('click', () => {
    registerTab.classList.add('active');
    loginTab.classList.remove('active');
    registerForm.classList.add('active');
    loginForm.classList.remove('active');
});

for (let i = 0; i < document.getElementsByClassName('openPass').length; i++) {
    const eye = document.getElementsByClassName('openPass')[i];
    eye.addEventListener('click', () => {
        const inputField = document.getElementsByClassName('pass')[i];
        if (inputField.type === 'password') {
            inputField.type = 'text';
            eye.textContent = 'Hide';
        } else {
            inputField.type = 'password';
            eye.textContent = 'Show';
        }
    });
}

const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(registerForm);

    const userData = {
        username: formData.get("registerUsername"),
        email: formData.get("registerEmail"),
        password: formData.get("registerPassword")
    };

    // Запрос отправки данных на сервер
    const request = fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(userData)
    });

    request
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok" + response.statusText);
            } 
            return response.json();
        })
        .then(data => {
            console.log("Registration successful:", data);
            errorBox.textContent = "Registration successful! Now you can login.";
            errorBox.style.display = "block";
            errorBox.style.backgroundColor = "#4CAF50";

            loginTab.classList.add('active');
            registerTab.classList.remove('active');
            loginForm.classList.add('active');
            registerForm.classList.remove('active');

            setTimeout(() => {
                errorBox.style.display = "none";
            }, 1000);

            
        })
        .catch(error => {
            console.error("Registration failed:", error);
        });
})

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(loginForm);

    const userData = {
        username: formData.get("loginUsername"),
        password: formData.get("loginPassword")
    };

    // Запрос отправки данных на сервер
    const request = fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(userData)
    });

    request
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok" + response.statusText);
            } 
            return response.json();
        })
        .then(data => {
            localStorage.setItem('username', userData.username); // Сохраняем имя пользователя в localStorage (типо CurrentUser)

            console.log("Login successful:", data);
            errorBox.textContent = "Login successful!";
            errorBox.style.display = "block";
            errorBox.style.backgroundColor = "#4CAF50";
            

            setTimeout(() => {
                errorBox.style.display = "none";
            }, 1000);

            setTimeout(() => {
                window.location.href = "location/location.html"; // Перенаправляем на страницу location.html
            }, 600);
        })
        .catch(error => {
            errorBox.textContent = "Login failed.";
            errorBox.style.display = "block";
            errorBox.style.backgroundColor = "#fa4646";

            setTimeout(() => {
                errorBox.style.display = "none";
            }, 500);

            console.error("Login failed:", error);
        });
});