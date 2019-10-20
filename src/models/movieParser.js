import Sequelize from 'sequelize'
import database from './model'

const movieParser = database.sequelize.define('movieLists', {
  title: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  alternativeTitle: {
    type: Sequelize.STRING,
  },
  extent: {
    type: Sequelize.STRING,
  },
  language: {
    type: Sequelize.STRING,
  },
  regDate: {
    type: Sequelize.DATE,
  },
  person: {
    type: Sequelize.TEXT,
  },
  referenceIdentifier: {
    type: Sequelize.TEXT,
  },
  rights: {
    type: Sequelize.STRING,
  },
  subjectCategory: {
    type: Sequelize.STRING,
  },
}, {
  timestamps: false,
})

export default movieParser
