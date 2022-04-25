require('../.env');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE,process.env.USER,process.env.PASSWORD,{
    host:"localhost",
    dialect:"mysql"
});

sequelize.authenticate().then(()=>console.log("conectado")).catch((e)=>console.log(e))

module.exports = sequelize;