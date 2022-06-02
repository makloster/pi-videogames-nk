/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai')
const session = require('supertest-session')
const app = require('../../src/app.js')
const { Videogame, conn } = require('../../src/db.js')

const agent = session(app)
const videogame = {
  name: 'A WTF extreme adventure 3',
  description: 'WTF es pa probar este test',
  image: 'https://www.google.com.ar/images/branding/googlelogo/2x/googlelogo_color_160x56dp.png',
  rating: 2,
  released: '2015-09-23',
  rating: 4.76,
  platforms: [
    'PC',
    'Xbox One',
    'macOS'
  ],
  genres: [
    'Action',
    'Casual',
    'Indie'
  ]
}

describe('Videogame routes', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err)
    }))
  beforeEach(() => Videogame.sync({ force: true })
    .then(() => Videogame.create(videogame)))
    .catch((err) => err)

})
describe('VIDEOGAME ROUTES', () => {
  describe('GET /api/genres', () => {
    it('should get 200', () => agent.get('/api/genres').expect(200))
  })
  describe('GET /api/videogames/{idVideogame}', () => {
    it('should get 200', () => agent.get('/api/videogames/3200').expect(200))
  })
  describe('POST /api/videogames', () => {
    it('should get 201', () =>
      agent.post('/api/videogames').send(videogame).expect(201))
  })
})