const { Model, DataTypes } = require('sequelize')
const client = require('../config/config')// connection to sequelize


class Post extends Model { }

Post.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id'
            }
        }
    },
    {
        sequelize: client,
        freezeTableName: true, // don't change the table name to plural
        underscored: true, //use snake_case for column names
        modelName: 'post'
    }
)

module.exports = Post