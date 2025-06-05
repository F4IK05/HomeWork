const fs = require('fs');
const express = require('express');
const bcrypt = require('bcrypt');
const path = require('path');

const app = express();
const port = 3000;

// Хостинг статических файлов и парсинг JSON
app.use(express.static('public'));
app.use(express.json());

// Установка пути к файлу users.json
app.get('/users.json', (req, res) => {
  res.sendFile(path.join(__dirname, 'users.json'));
});

// Инициализация массива данных пользователей
let data = [];

try {
    // Чтение данных из файла users.json
    const fileContent = fs.readFileSync('users.json', 'utf8');
    if (fileContent) {
        // Парсинг JSON данных
        data = JSON.parse(fileContent);
    }
} catch (error) {
    console.error(error);
}

// Функция для сохранения данных в файл users.json
const saveData = () => {
    const jsonData = JSON.stringify(data, null, 2);
    fs.writeFile('users.json', jsonData, (error) => {
        if (error) {
            console.error(error);
            return;
        }
    });
}

// Обработка запросов на регистрацию и вход
app.post('/register', (request, response) => {
    const { username, email, password } = request.body;

    if (data.some(u => u.username === username)) {
            console.log(`User ${username} already exists.`);
            return response.status(400).json({
                message: 'User already exists'
            });
        }

        const hashedPassword = bcrypt.hashSync(password, 10);
        const newUser = {
            username,
            email,
            password: hashedPassword,
            location: null
        }

        data.push(newUser);
        saveData();
        console.log(`User ${username} registered successfully.`);

        return response.status(201).json({
            message: 'User registered successfully'
        });
})

app.post('/login', (request, response) => {
    const { username, password } = request.body;

    const user = data.find(u => u.username === username);

    if (!user) {
        console.log(`User ${username} not found.`);
        return response.status(400).json({
            message: 'User not found'
        });
    }

    if (bcrypt.compareSync(password, user.password)) {
        console.log(`User ${username} logged in successfully.`);
        return response.status(201).json({
            message: 'Login successful'
        });
    } else {
        console.log(`Invalid password for user ${username}.`);
        return response.status(400).json({
            message: 'Invalid password'
        });
    }
});

// Обработка запросов на обновление местоположения пользователя(из location.js)
app.post('/location', (request, response) => {
    const { username, lat, lng } = request.body;

    const user = data.find(u => u.username === username);

    user.location = { lat, lng };
    saveData();
    console.log(`Location for user ${username} updated successfully.`);

    return response.status(200).json({
        message: 'Location updated successfully'
    });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});