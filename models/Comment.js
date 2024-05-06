const { Model, DataTypes } = require('sequelize')
const client = require('../config/config')// connection to sequelize

class Comment extends Model {}


Comment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references:{
                model: 'user',
                key: 'id'
            }
        },
        postId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'post',
                key: 'id'
            }
        }
    },
    {
        sequelize: client,
        freezeTableName: true,
        underscored: true,
        modelName: 'comment',
        
    }
)

module.exports = Comment