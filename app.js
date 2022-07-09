if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}
const express = require('express')
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

const app = express()


const port = process.env.PORT || process.env.SERVER_PORT
app.listen(port, () => {
    console.log("SERVER STARTED AT " + port)
})