import Sequelize from 'sequelize'
import database from './model'

const movieParser = database.sequelize.define('movie-parser', {
  movieNm: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  movieNmEn: {
    type: Sequelize.STRING,
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
    allowNull: false,
  },
  companys: {
    type: Sequelize.STRING,
    allowNull: false,
  },
}, {
  timestamps: false,
})

export default movieParser
