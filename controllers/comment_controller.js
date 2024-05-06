const { Comment, Post } = require('../models')
//not sure if i need post model here, we will see


const comment_controller = {
    //create a new comment
    createComment: async (req, res)=>{
        try{
           //get the comment data
           //get the post id 
           //get the user id from the session
              //create a new comment
                //redirect to the post
            
            const commentData = req.body
            const postId = req.params.id
            const userId = req.session.userId
            await Comment.create({
                ...commentData,
                userId,
                postId
            })

            

            res.redirect(`/`) 
        }catch(err){
            console.log(err)
            
        }
    }

}

module.exports = comment_controller