const express = require('express');
const mysql = require('mysql');

const app = express();

// --- outline: none をやらない唯一の方法 ---
require('what-input');

// ---- MySQL設定 ----

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', //迂闊に載せない方がいいよな？多分…
    database: 'popn_simple_simulator_app'
});

connection.connect((err) => {
    if (err) {
        console.log('error connecting: ' + err.stack);
        return;
    }
    console.log('success');
});

// ---- 公開設定とかいろいろ

app.use('/public', express.static('public'));
app.use(express.urlencoded({ extended: false }));

app.set('views', './views');
app.set('view engine', 'ejs');


// ---- ルーター設定 ----

const router = require('./routes/router.js');

app.use('/', router);
app.use('/top', router);
app.use('/index', router);
app.use('/create', router);
app.use('/delete', router);


app.listen(3000);
console.log('Server running at http://localhost:3000');