const { Videogame, conn } = require('../../src/db.js')
const { expect } = require('chai')

describe('VIDEOGAME MODEL', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err)
    }))
  describe('Validators', () => {
    beforeEach(() => Videogame.sync({ force: true }))
    describe('· name', () => {
      it('should throw an error if name is null', (done) => {
        Videogame.create({ name: '' })
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done())
      })
      it('should work when its a valid name', () => {
        Videogame.create({ name: 'Super Mario Bros' })
      })
    })
    
    describe('· all required fields', () => {
      it('should work when all required fields are completed', (done) => {
        Videogame.create({
          name: 'A WTF extreme adventure 3',
          description: 'WTF es pa probar este test',
          image: 'https://www.google.com.ar/images/branding/googlelogo/2x/googlelogo_color_160x56dp.png',
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
        })
          .then(() => done())
          .catch(() => done(new Error('Some required fields are empty')))
      })
      it('should throw an error if any required field is empty', (done) => {
        Videogame.create({
          name: 'A WTF extreme adventure 3',
          description: 'WTF es pa probar este test',

        }).then(() => done(new Error('It requires name, description and platforms')))
          .catch(() => done())
      })
    })

    describe('· rating', () => {
      it('should throw an error if rating is not between the valid range', (done) => {
        Videogame.create({ rating: 7 })
          .then(() => done(new Error('Rating must be a number between 0 and 5')))
          .catch(() => done())
      })
      it('should work when its a rating', () => {
        Videogame.create({ rating: 4 })
      })
    })
  })
})