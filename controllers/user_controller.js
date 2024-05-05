const { User } = require('../models')
const bcrypt = require('bcrypt')

const userController = {
    //create a new user
    createUser: async (req, res) => {
        try{
            //create a new user
            const userData = await User.create(req.body)
            //save user id in a session
            req.session.user_id = userData.id 

            
            
            res.redirect('/') //redirect to the homepage
        }catch(err){
            res.json(err)
            console.log(err)
        }
    },

        //login a user
        login: async (req,res)=>{
            try{
                //find the user by username
                const {username, password} = req.body
                const user = await User.findOne({where: {username}})

                //if the user does not exist
                if(!user){
                    res.json({message: 'Incorrect username or password'})
                    return
                }

                //validate password
                const validPassword = user.validatePassword(password)

                //if the password is incorrect
                if(!validPassword){
                    res.json({message: 'Incorrect username or password'})
                    return
                }

                //when logged in store the user data in the session
                req.session.user_id = user.id

                //redirect to the homepage
                res.redirect('/')
            }catch(err){
                res.json(err)
                console.log(err)
            }
        }


} 

module.exports = userController