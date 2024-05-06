const blogpost_router = require('express').Router()

const post_controller = require('../controllers/post_controller')

//create a new post
 blogpost_router.post('/dashboard', post_controller.createPost)

 //delete a post
 blogpost_router.post('/dashboard/:id', post_controller.deletePost)

 //update a post
//triggers when update button makes and update request
blogpost_router.post('/dashboard/update/:id', post_controller.updatePost)
 

 module.exports = blogpost_router
