const { Model, DataTypes } = require('sequelize')
const client = require('../config/config')// connection to sequelize

class Comment extends Model {}


Comment.init(
    {
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    },
    {
        sequelize: client,
        modelName: 'comment'
    }
)

module.exports = Comment