const { User, Post, Comment } = require('../models')


function isAuth(req,res,next){
    if(!req.session.userId){
        return res.redirect('/login')
    }
    next()
}


// function updateSession(req, res, next) {
//     req.session._garbage = Date();
//     req.session.touch();
//     next();
// }

// const getUserName = async (userId)=>{
//     const user = await User.findByPk(userId)
//     return user.username

// }

//homepage
async function renderHomepage(req,res){
    try{
        const posts = await Post.findAll({
            include: [{model: User, attributes: ['username']}, {model: Comment, include: User}], // display the username of the user who created the post
            order: [['created_at', 'DESC']] // display the posts in descending order by the created at value
        })
        const post = posts.map(post => post.get({plain: true})) 
        //convert the posts to plain objects

      //call the getUserName function to get the username
      //then map through the comments and add the username to each comment
            // post.forEach(post => {
            //     post.comments.forEach(async comment => {
            //         comment.username = await getUserName(comment.userId)
            //     })
            // })
            
            
            
           
            res.render('homepage', {post, isLogged: req.session.userId ? true : false, user: req.session.userId})
        }catch(err){
            res.json(err)
            console.log(err)
    }
}

//login page
function renderLogin(req,res){
    res.render('login')
}

//register page
function renderRegister(req,res){
    res.render('signup')
}

//logout
function renderLogout(req,res){
    req.session.destroy(() => {
        res.redirect('/')
    })
}

//user's dashboard
async function renderDashboard(req,res){
    try{
        const posts = await Post.findAll({
            where: {user_id: req.session.userId},
            include: [{model: User, attributes: ['username']}],
            order: [['created_at', 'DESC']]
        })

        const post = posts.map(post => post.get({plain: true}))//convert the posts to plain objects
        res.render('dashboard', {post, isLogged: req.session.userId ? true : false, user: req.session.userId})
    }catch(err){
        res.json(err)
        console.log(err)
    }

}

//user login
async function login(req,res){
    try{
       //find the user by username
         const {username, password} = req.body
            const user = await User.findOne({where: {username}})

            //if the user does not exist
            if(!user){
                res.send({message: 'Incorrect username or password'})
                return
            }

            //validate password
            const validPassword = user.validatePassword(password)

            //if the password is incorrect
            if(!validPassword){
                res.send({message: 'Incorrect username or password'})
                return
            }

            //when logged in store the user data in the session
            req.session.userId = user.id

            

            //redirect to the dashboard
            res.redirect('/dashboard')
        }catch(err){
            res.send(err)
            console.log(err)
        }
    }

    //user signup
    async function signup(req,res){
        try{
            //create a new user
            const userData = await User.create(req.body)
            //save user id in a session
            req.session.userId = userData.id

            res.redirect('/dashboard') //redirect to the dashboard
        }catch(err){
            res.send(err)
            console.log(err)
        }
    }

    async function logout(req,res){
        req.session.destroy(() => {
            res.redirect('/')
        })
    
    }

module.exports = {renderHomepage, renderLogin, renderLogout, renderRegister, renderDashboard, isAuth, login, signup, logout}