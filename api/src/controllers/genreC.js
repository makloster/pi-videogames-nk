const { Genre } = require('../db')
const { checkDB } = require('./utils')

const getAllGenres = async (req, res, next) => {
  try {
    await checkDB()
    let allGenres = await Genre.findAll({ attributes: ['name'] })
    res.json(allGenres)
  } catch (error) {
    next(error)
  }
}

module.exports = { getAllGenres }