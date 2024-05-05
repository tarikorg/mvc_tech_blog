//import router 
//import model
const user_router = require('express').Router()
const user_controller = require('../controllers/user_controller')

//create a new user
user_router.post('/register', user_controller.createUser)

//login a user
user_router.post('/login', user_controller.login)

    module.exports = user_router