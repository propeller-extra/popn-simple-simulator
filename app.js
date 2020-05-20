"use strict";

const express = require('express');
const app = express();
var bodyParser = require('body-parser');

// 送信されたフォームの内容を変換して取得可能にする
app.use(bodyParser.urlencoded({ extended: false }));

// ---- 公開設定とかいろいろ

app.use('/public', express.static('public'));
app.use(express.urlencoded({ extended: false }));

app.set('view engine', 'ejs');
app.set('views', './views');

// ---- ルーター設定 ----

const router = require('./routes/router.js');

app.use('/', router);
app.use('/top', router);
app.use('/index', router);
app.use('/create', router);
app.use('/delete', router);
app.use('/update', router);


app.listen(3000);
console.log('Server running at http://localhost:3000');