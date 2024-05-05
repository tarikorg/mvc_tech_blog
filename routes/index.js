const router = require('express').Router()
//COMBINE ALL ROUTES

const blogpost_routes = require('./blogpost-routes')
const user_routes = require('./user-routes')
const comment_routes = require('./comment-routes')


router.use('/', [blogpost_routes, user_routes, comment_routes])

module.exports = router