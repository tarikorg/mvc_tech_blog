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
        hooks: {
            beforeCreate: async (newData) => {
                newData.password = await bcrypt.hash(newData.password, 10)//encrypt the new password recieved
                return newData //return the password
            },

            beforeUpdate: async (updatedData) => {
                updatedData.password = await bcrypt.hash(updatedData.password, 10)
                return updatedData
            }
        },
        timestamps: false

    }
)

module.exports = User