const { Router } = require('express')
const router = Router()

const { getAllVideogames, getByID, postVG, putGame, deleteVG } = require('../controllers/videogameC')
const { getAllGenres } = require('../controllers/genreC')

router.get('/videogames', getAllVideogames)
router.get('/videogames/:id', getByID)
router.post('/videogames', postVG)
router.put('/videogames/:id', putGame)
router.delete('/videogames/:id', deleteVG)

router.get('/genres', getAllGenres)

module.exports = router