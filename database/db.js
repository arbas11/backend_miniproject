const mysql = require('mysql');

const connectDB = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root1234',
    database: 'merchant_dibimbing'
});

module.exports = { connectDB }