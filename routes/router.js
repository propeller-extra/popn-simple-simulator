var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    res.render('top.ejs');
});

router.get('/top', (req, res) => {
    res.render('top.ejs');
});

router.get('/index', (req, res) => {
    res.render('index.ejs');
});

// ---- MySQL ----

router.post('/create', (req, res) => {
    connection.query(
        'INSERT INTO p_9key_table VALUES(*)',
        (error, results) => {
            console.log(results);
            res.render('index.ejs');
        }
    );
});

router.post('/delete', (req, res) => {
    connection.query(
        '',
        (error, results) => {
            console.log(results);
            res.render('index.ejs');
        }
    )
});


module.exports = router;