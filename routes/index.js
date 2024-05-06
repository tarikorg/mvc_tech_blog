const router = require('express').Router()
//COMBINE ALL ROUTES

const blogpost_routes = require('./blogpost-routes')
const comment_routes = require('./comment-routes')
const view_routes = require('./view-routes')


router.use('/', [blogpost_routes, comment_routes, view_routes])

module.exports = router