// ---- MySQL設定 ----

const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Chocobo_18', //迂闊に載せない方がいいよな？多分…
    database: 'popn_simple_simulator_app'
});

connection.connect((err) => {
    if (err) {
        console.log('mysql error connecting: ' + err.stack);
        return;
    }
    console.log('mysql connected as id ' + connection.threadId);
});

module.exports = connection;