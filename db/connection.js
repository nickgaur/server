const mysql = require('mysql')

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
})

// CREATING CONNECTION
db.connect((err) => {
    if (err) {
        throw err
    }
    else {
        console.log("DATABASE CONNECTED!!")
    }
});

module.exports = db;