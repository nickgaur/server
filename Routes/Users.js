const express = require('express')
const Router = express.Router({ mergeParams: true })
const { postLoginData,renderLoginDetails } = require('../Controller/Users')


Router
.route('/login')
.get(renderLoginDetails)
.post(postLoginData)




module.exports = Router