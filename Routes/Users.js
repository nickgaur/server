const express = require('express')
const Router = express.Router({ mergeParams: true })
const { postLoginForm, renderHomepage, renderLoginForm, renderRegisterForm,
     postRegisterForm, logout } = require('../Controller/Users')
const { isLoggedIn, isAdminLoggedIn } = require('../middleware/middleware')


Router
    .route('/')
    .get(isLoggedIn, renderHomepage)

Router
    .route('/login')
    .get(renderLoginForm)
    .post(postLoginForm)

Router
    .route('/register')
    .get(isLoggedIn, isAdminLoggedIn, renderRegisterForm)
    .post(isLoggedIn, isAdminLoggedIn, postRegisterForm)

Router
    .route("/logout")
    .post(isLoggedIn,logout)


module.exports = Router