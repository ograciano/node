const Sequelize = require('sequelize-oracle');

const env = process.env;

const dgo = new Sequelize(env.INST_DGO, env.USR_DGO,env.PASS_DGO, {
    host: env.HOST_DGO,
    dialect: 'oracle'
})
const gp = new Sequelize(env.INST_GP, env.USR_GP,env.PASS_GP, {
    host: env.HOST_GP,
    dialect: 'oracle'
})
const sp = new Sequelize(env.INST_SP, env.USR_SP,env.PASS_SP, {
    host: env.HOST_SP,
    dialect: 'oracle'
})
const es = new Sequelize(env.INST_ES, env.USR_ES,env.PASS_ES, {
    host: env.HOST_ES,
    dialect: 'oracle'
})

module.exports = {dgo, gp, sp, es};