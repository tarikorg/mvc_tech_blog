const { Model, DataTypes } = require('sequelize')
const client = require('../config/config')// connection to sequelize

class Post extends Model {}

Post.init(
    {
         title: {
            type: DataTypes.STRING,
            allowNull: false
         },
         content: {
            type: DataTypes.TEXT,
            allowNull: false
         }
    },
    {
        sequelize: client,
        modelName: 'post'
    }
)

module.exports = Posts