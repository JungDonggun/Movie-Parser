import { Sequelize } from 'sequelize'
import config from 'config'

const dbConfig = config.get('Customer.dbConfig')

const {
  database, userName, password, host, dialect,
} = dbConfig

const sequelize = new Sequelize(database, userName, password, {
  host,
  dialect,
  pool: {
    max: 100,
    min: 0,
    idle: 10000,
  },
  define: {
    charset: 'utf8',
    collate: 'utf8_general_ci',
  },
})

export default {
  sequelize,
}
