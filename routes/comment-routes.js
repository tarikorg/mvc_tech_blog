const comment_routes = require('express').Router()
const comment_controller = require('../controllers/comment_controller')

//create a new comment with the controller
comment_routes.post('/comment/:id', comment_controller.createComment)



module.exports = comment_routes