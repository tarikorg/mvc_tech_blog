const router = require('express').Router()
const viewController = require('../controllers/view_controller')


//homepage
router.get('/', viewController.renderHomepage)

//login page
router.get('/login', viewController.renderLogin)

//register page
router.get('/signup', viewController.renderRegister)


//user's dashboard
router.get('/dashboard', viewController.isAuth, viewController.renderDashboard)

// Signup route
router.post('/signup', viewController.signup);

// Login route
router.post('/login', viewController.login);

// Logout route
router.get('/logout', viewController.logout)

module.exports = router

