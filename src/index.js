import database from './models/model'

database.sequelize.sync().then(() => {
  console.log("✅ DataBase connection Success.")
}).catch(err => {
  console.log("🚨 DataBase connection Failed.", err)
})

