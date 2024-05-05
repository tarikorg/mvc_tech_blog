const User = require('./User')
const Post = require('./Post')
const Comment = require('./Comment')


User.hasMany(Post,{
    foreignkey: 'userId',
    onDelete: 'CASCADE' //when you delete a user , delete their posts
})

User.hasMany(Comment, {
    foreignKey: 'userId',
    onDelete: 'CASCADE'
})

Post.belongsTo(User, {
    foreignKey: 'userId' //every post belongs to a user
})

Post.hasMany(Comment, {
    foreignKey: 'postId', // a post can have MANY comments
    onDelete: 'CASCADE'  //when post deleted, remove comment 
})

Comment.belongsTo(User, {
    foreignKey: 'userId' //a comment belongs to a USER
})

Comment.belongsTo(Post, {
    foreignKey: 'postId' // a comments belongs to a POST
})


module.exports = { User, Post, Comment }