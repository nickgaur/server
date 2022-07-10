if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}
const express = require('express');
const userRoutes = require('./Routes/Users');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const path = require('path');
const cookieParser = require('cookie-parser');
const app = express();

app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true
}))
app.use(cookieParser())
app.use(express.json())
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
        path: '/',
        httpOnly: false,
        maxAge: 24 * 60 * 60 * 1000
    },
}))

// ROUTES
app.use('/api/auth', userRoutes);
app.use('*', (req, res) => res.send("Page Not Found"));

const port = process.env.PORT || process.env.SERVER_PORT
app.listen(port, () => {
    console.log("SERVER STARTED AT " + port)
})