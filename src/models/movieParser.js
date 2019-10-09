import Sequelize from 'sequelize'
import database from './model'

const movieParser = database.sequelize.define('movieLists', {
  movieNm: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  movieNmEn: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  prdtYear: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  openDt: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  prdtStatNm: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  nationAlt: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  genreAlt: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  repNationNm: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  directors: {
    type: Sequelize.STRING,
  },
}, {
  timestamps: false,
})

export default movieParser
