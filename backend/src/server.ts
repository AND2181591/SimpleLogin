import express from 'express';
import cors from 'cors';
import { sample_users } from './data';
import jwt from 'jsonwebtoken';

const app = express();
app.use(express.json());

app.use(cors({
    credentials: true, 
    origin: ['http://localhost:4200']
}));

app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    const user = sample_users.find(user => user.email === email && user.password === password);

    if (user) {
        res.send(generateTokenResponse(user));
    } else {
        res.status(400).send('Email or password is not valid');
    }
});

app.post('/api/register', (req, res) => {
    const user = req.body;
    const newUser = { 
        displayName: user.firstName + ' ' + user.lastName, 
        email: user.email, 
        password: user.password
    };
    sample_users.push(newUser);

    console.log(sample_users)
    res.send(generateTokenResponse(newUser));
});

const generateTokenResponse = (user: any) => {
    const token = jwt.sign({
        email: user.email
    }, 'SomeRandomText', {
        expiresIn: '30d'
    });

    user.token = token;
    return user;
}

const port = 5000;
app.listen(port, () => {
    console.log('Website served on http://localhost:' + port);
});