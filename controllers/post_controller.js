const { Post } = require('../models')


const post_controller = {
//create a new post
    createPost: async (req,res)=>{
        try{
            const postData = await Post.create({
                ...req.body,
                user_id: req.session.user_id //get the user id from the current session

            })

            res.json(postData)//send the new post data
        }catch(err){
            res.json(err)
            console.log(err)
        }
    },

    //delete a post
    deletePost: async (req,res)=>{
        try{
            const deleteData = await Post.destroy({
                where: {
                    id: req.params.id, // target the post by given id
                    user_id: req.session.user_id // make sure user is the owner of the post
                }
            })

            if(!deleteData){
                res.json({message: 'No post found with this id'})
                return
            }

            res.json({message: 'Post deleted'})
        }catch(err){
            res.json(err)
        }
    },

    //update a post
    //triggers when update button makes an update request
     updatePost: async (req,res)=> {
        try{
            //take the new data
            //target the post by :id
            // check session user id
            //update the post
            const updateData = await Post.update(req.body, {
                where: {
                    id: req.params.id,
                    user_id: req.session.user_id
                }
            })

            if(!updateData[0]){
                res.json({message: 'No post found'})
                return
            }

            //send the updated post data back
            res.json(updateData)


        }catch(err){
            res.json(err)
            console.log(err)
        }
}
}

module.exports = post_controller