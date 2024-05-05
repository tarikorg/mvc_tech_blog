const express = require('express')
const session = require('express-session')
const client= require('./config/config')

const SequelizeStore = require('connect-session-sequelize')(session.Store)
const routes = require('./routes')
const path = require('path')

const sequelize = require('./config/config')

const app = express()


const PORT = process.env.PORT || 3022

//create a session with all the required properties
const sessions = {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: client
    })
}

//session middleware
app.use(session(sessions))

app.use(express.json())
//we are going to fill out forms,search stuff up
app.use(express.urlencoded({extended: true}))

app.use(express.static(path.join(__dirname, 'public')))

//import routes folder
app.use(routes)


//connect to the database
//then start the server
sequelize.sync({force: false}).then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`)
    })
})