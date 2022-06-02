const { default: get } = require('axios')
const { Genre, Videogame } = require('../db')
const { API_KEY } = process.env

const apiInfoAll = async () => {
  try {
    let apiGames = []
    for (let i = 1; i < 5; i++) { // necesito los primeros 100 juegos, por eso paro a la 4ta iteración
      const apiGet = await get(`https://api.rawg.io/api/games?key=${API_KEY}&page_size=25&page=${i}`)
      const games = apiGet.data.results?.map(vg => {
        return {
          name: vg.name,
          id: vg.id,
          image: vg.background_image,
          released: vg.released,
          rating: vg.rating,
          platforms: vg.platforms?.map(p => p.platform.name),
          genres: vg.genres?.map(g => g.name)
        }
      })
      apiGames = apiGames?.concat(games)
    }
    return apiGames
  } catch (error) {
    console.log(error)
  }
}

const dbInfoAll = async () => {
  try {
    const vgFind = await Videogame.findAll({
      include: {
        model: Genre,
        attributes: ['name']
      }
    })
    return vgFind.map(vg => {
      return {
        name: vg.name,
        id: vg.id,
        description: vg.description,
        image: vg.image,
        released: vg.released,
        rating: vg.rating,
        platforms: vg.platforms,
        genres: vg.genres?.map(g => g.name),
        createdInDB: vg.createdInDB
      }
    })
  } catch (error) {
    console.log(error)
  }
}

const apiGameByID = async (id) => {
  try {
    const game = await get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
    const res = game.data
    return {
      name: res.name,
      id: res.id,
      description: res.description_raw,
      image: res.background_image,
      released: res.released,
      rating: res.rating,
      platforms: res.platforms?.map(p => p.platform.name),
      genres: res.genres?.map(g => g.name)
    }
  } catch (error) {
    console.log(error)
  }
}

const checkDB = async () => { // TODO agregar una const para que no vuelva a chequear en la DB
  try {
    if (!await Genre.findOne()) {
      const apiResult = await get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
      const genres = apiResult.data.results.map(g => {
        return { name: g.name }
      })
      const sortedGenres = genres.sort((a, b) => {
        return (
          (a.name > b.name)
            ? 1
            : ((a.name < b.name)
              ? -1
              : 0))
      })
      await Genre.bulkCreate(sortedGenres)
    }
  } catch (error) {
    console.log(error)
  }
}


// const mapToHome = (vgs) => {
//   vgs.map(vg => {
//     return {
//       name: vg.name,
//       id: vg.id,
//       image: vg.image,
//       genres: vg.genres?.map(g => g.name)
//     }
//   })
// }

// const sortByName = (vgs) => {
//   vgs.sort((a, b) => a.name.localeCompare(b.name))
// }

module.exports = {
  apiInfoAll,
  dbInfoAll,
  apiGameByID,
  checkDB
}