const blogpost_router = require('express').Router()

const post_controller = require('../controllers/post_controller')

//create a new post
 blogpost_router.post('/', post_controller.createPost)

 //delete a post
 blogpost_router.delete('/:id', post_controller.deletePost)

 //update a post
//triggers when update button makes and update request
blogpost_router.put('/:id', post_controller.updatePost)
 

 module.exports = blogpost_router
