const express = require('express');

const app = express();

require('what-input');

app.use(express.static('images'));
app.use(express.static('css'));

app.get('/top', (req, res) => {
    res.render('top.ejs');
});

app.get('/index', (req, res) => {
    res.render('index.ejs');
});

app.listen(3000);