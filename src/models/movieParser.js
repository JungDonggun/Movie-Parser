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
    allowNull: false,
  },
  language: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  regDate: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  person: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  referenceIdentifier: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  rights: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  subjectCategory: {
    type: Sequelize.STRING,
    allowNull: false,
  },
}, {
  timestamps: false,
})

export default movieParser
