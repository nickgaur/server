const express = require('express')
const mysql = require('mysql')

const app = express()

app.listen(8000, () => {
    console.log("SERVER STARTED AT " + PORT)
})