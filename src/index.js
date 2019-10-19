import database from './models/model'
import movieParser from './custom_module/parser'

database.sequelize.sync().then(() => {
  console.log('✅ DataBase connection Success.')
}).catch((err) => {
  console.error('🚨 DataBase connection Failed.', err)
})


movieParser(10)
