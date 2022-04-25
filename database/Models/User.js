const sequelize = require('../conexao');
const types = require('sequelize').DataTypes;

const User = sequelize.define('users',{
    name:{
        type:types.STRING
    },
    age:{
        type:types.INTEGER
    },
    email:{
        type:types.STRING
    }
})

module.exports = User;