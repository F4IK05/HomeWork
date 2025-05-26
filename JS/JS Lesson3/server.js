const fs = require('fs');
const express = require('express');
const bcrypt = require('bcrypt');

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.json());

let data = [];

try {
    const fileContent = fs.readFileSync('users.json', 'utf8');
    if (fileContent) {
        data = JSON.parse(fileContent);
    }
} catch (error) {
    console.error(error);
}

const saveData = () => {
    const jsonData = JSON.stringify(data, null, 2);
    fs.writeFile('users.json', jsonData, (error) => {
        if (error) {
            console.error(error);
            return;
        }
    });
}

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
            password: hashedPassword
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

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});