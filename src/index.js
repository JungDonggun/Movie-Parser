import database from './models/model'
import test from './custom_module/parser'

database.sequelize.sync().then(() => {
  console.log('✅ DataBase connection Success.')
}).catch((err) => {
  console.error('🚨 DataBase connection Failed.', err)
})


test()
