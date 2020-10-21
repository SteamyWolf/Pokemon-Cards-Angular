const express = require('express');
const bodyParer = require('body-parser');
const bodyParser = require('body-parser');

const app = express();

//MIDDLEWARE
app.use(bodyParer.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Request-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS')
    next();
})

//ROUTES

app.post('/api/auth', (req, res, next) => {
    const user = req.body;
    console.log(user);
    res.status(201).json({
        message: 'Post added successfully'
    });
})

app.get('/api/auth', (req, res, next) => {
    const auth = [
        {
            id: 'werybf7erg6',
            email: 'wyatt@mail.com',
            password: '123456'
        },
        {
            id: 'fh3484g35g3g',
            email: 'camille@mail.com',
            password: '7890000'
        }
    ]
    res.status(200).json({
        message: 'Auth was successful',
        auth: auth
    });
});



module.exports = app;