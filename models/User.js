const { Model, DataTypes } = require('sequelize')
const client = require('../config/config')// connection to sequelize
const bcrypt = require('bcrypt')

//username
//password
// encrypt
// validating password


class User extends Model {
    validatePassword(password){
        return bcrypt.compareSync(password, this.password)
    }
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password:{
          type: DataTypes.STRING,
          validate: {
            len: 6
          },
          allowNull: false
        }
    },
    {
        sequelize: client,
        modelName: 'user',
        underscored: true,
        freezeTableName: true,
        hooks: {
            beforeCreate: async (newData) => {
                newData.password = await bcrypt.hash(newData.password, 10)//encrypt the new password recieved
                return newData //return the password
            },

            beforeUpdate: async (updatedData) => {
                updatedData.password = await bcrypt.hash(updatedData.password, 10)
                return updatedData
            }
        }

    }
)

module.exports = User