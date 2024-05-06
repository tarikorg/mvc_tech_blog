const { Post } = require('../models')


const post_controller = {
    //create a new post
    createPost: async (req, res) => {
        try {
            const { title, content } = req.body
            const userId = req.session.userId // Retrieve userId from session

             await Post.create({
                title,
                content,
                userId, // Pass userId along with post data
            })

            res.redirect('/dashboard') // Redirect to dashboard after creating a post
        } catch (err) {
            res.json(err)
            console.log(err)
        }
    },

    //delete a post
    deletePost: async (req, res) => {
        try {
            const deleteData = await Post.destroy({
                where: {
                    id: req.params.id, // target the post by given id
                    user_id: req.session.userId // make sure user is the owner of the post
                }
            })

            if (!deleteData) {
                res.send({ message: 'No post found with this id' })
                return
            }
            res.redirect('/dashboard')// Redirect to dashboard after deleting a post
            res.send({ message: 'Post deleted' })
        } catch (err) {
            console.log(err)
        }
    },

    //update a post
    //triggers when update button makes an update request
    updatePost: async (req, res) => {
        try {
            //take the new data
            //target the post by :id
            // check session user id
            //update the post
            const updateData = await Post.update(req.body, {
                where: {
                    id: req.params.id,
                    user_id: req.session.userId
                }
            })

            if (!updateData[0]) {
                res.send({ message: 'No post found' })
                return
            }

            res.redirect('/dashboard')
            //send the updated post data back
            res.send(updateData)


        } catch (err) {
           
            console.log(err)
        }
    }
}

module.exports = post_controller