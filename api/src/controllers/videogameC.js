const { default: get } = require('axios')
const { Op } = require('sequelize')
const { Genre, Videogame, Videogame_Genre } = require('../db')
const { apiInfoAll, dbInfoAll, apiGameByID, checkDB } = require('./utils')
const { API_KEY } = process.env

const getAllGames = async (req, res, next) => {
  try {
    let getResponse

    if (req.query.name) {
      const { name } = req.query
      const dbQueryToMap = await Videogame.findAll({
        where: {
          name: { [Op.iLike]: `%${name}%` }
        },
        attributes: {
          include: ['name', 'image', 'id']
        },
        include: {
          model: Genre,
          attributes: ['name'],
          through: {
            attributes: [],
          }
        }
      })

      const dbQuery = dbQueryToMap?.map(vg => {
        return {
          name: vg.name,
          id: vg.id,
          image: vg.image,
          genres: vg.genres?.map(g => g.name)
        }
      })

      const apiQueryToMap = await get(`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`)
      const apiQuery = apiQueryToMap?.data.results.map(vg => {
        return {
          name: vg.name,
          id: vg.id,
          image: vg.background_image,
          rating: vg.rating,
          genres: vg.genres?.map(g => g.name)
        }
      })
      getResponse = [...dbQuery, ...apiQuery].slice(0, 15)

    } else {
      const apiGames = await apiInfoAll()
      const dbGames = await dbInfoAll()
      getResponse = apiGames?.concat(dbGames)?.map(vg => {
        return {
          name: vg.name,
          id: vg.id,
          image: vg.image,
          rating: vg.rating,
          genres: vg.genres,
          platforms: vg.platforms,
          createdInDB: vg.createdInDB
        }
      })
    }
    if (getResponse.length) {
      res.json(getResponse)
    }
    else {
      res.status(404).json({ error_msg: 'Game(s) not found!' })
    }
  } catch (error) {
    next(error)
  }
}

const getByID = async (req, res, next) => {
  try {
    const { id } = req.params
    let game, response
    if (id) {
      await checkDB()
      id.includes('-') // reconoce si el formato de ID es DB o API
        ? game = (await dbInfoAll()).find(g => g.id === id)
        : game = await apiGameByID(id)
    }
    game ? (
      response = {
        name: game.name,
        description: game.description,
        image: game.image,
        released: game.released,
        rating: game.rating,
        platforms: game.platforms,
        genres: game.genres,
        createdInDB: game.createdInDB

      },
      res.json(response)
    )
      : res.status(404).json({ error_msg: 'Game(s) not found!' })
  } catch (error) {
    next(error)
  }
}

// const postGenre = async (req, res, next) => {
//   try {
//     const { genre } = req.body
//     if (genre) {
//       const newGenre = await Genre.create({
//         name: genre
//       })
//       res.status(201).json({ msg: 'Genre created!'})
//     } else {
//       res.status(400).json({ error_message: 'Could not create genre'})
//     }
//   } catch(error) {
//     console.log(error)
//   }
// }

const postVG = async (req, res, next) => {
  try {
    const { name, description, image, released, rating, platforms, genres } = req.body
    if (!await Videogame.findOne({ where: { name } })) {
      const VG = await Videogame.create({
        name,
        description,
        image,
        released: released ? released : '1900-01-01',
        rating: rating ? rating : 0,
        platforms
      })
      await checkDB()
      const dbGenres = await Genre.findAll({
        where: { name: genres }
      })
      VG.addGenre(dbGenres)
      res.status(201).json({
        success_message: `Game created!`,
        newGame: VG,
        associated_genres: dbGenres
      })
    } else {
      res.status(400).json({ error_msg: `${name} already exists!` })
    }
  } catch (error) {
    next(error)
  }
}

const putGame = async (req, res, next) => {
  try {
    const { id } = req.params
    const { name, description, image, released, rating, platforms, genres } = req.body
    const VG = await Videogame.findOne({ where: { id } })
    await VG.update(
      {
        name: name ? name : VG.name,
        description: description ? description : VG.description,
        image: image ? image : VG.image,
        released: released ? released : VG.released,
        rating: rating ? rating : VG.rating,
        platforms: platforms ? platforms : VG.platforms
      },
      { where: { id } }
    )

    if (genres) {
      await Videogame_Genre.destroy({
        where: { videogameId: id }
      })
      const genreDB = await Genre.findAll({
        where: { name: genres },
        attributes: ['name', 'id'],
      })
      VG.addGenre(genreDB)
    }
    res.json({
      success_message: 'Game updated!',
      updated_game: VG,
      // associated_genres: genreDB
    })
  } catch (error) {
    next(error)
  }
}

const deleteVG = async (req, res, next) => {
  try {
    const { id } = req.params
    await Videogame.destroy({
      where: { id }
    })
    res.json({ success_message: 'Game deleted!' })
  } catch (error) {
    next(error)
  }
}

module.exports = { getAllGames, getByID, postVG, putGame, deleteVG }