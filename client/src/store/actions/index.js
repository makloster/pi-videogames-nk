import {
  GET_ALL_GAMES,
  GET_GAME_BY_ID,
  GET_GAMES_BY_QUERY,
  FILTER_BY_GENRE,
  FILTER_BY_SOURCE,
  SORT_BY,
  GET_GENRES,
  CLEAR_STATE_NAVIGATION,
  CLEAR_STATE_DETAIL,
  REDIRECT,
  // CLEAR_STATE_GAMES,
  // GET_PLATFORMS
} from '../consts'
import { get, post, delete as del, put } from 'axios'

export function getAllGames() {
  return (dispatch) => {
    get(`/api/videogames`)
      .then(videogames => {
        dispatch({
          type: GET_ALL_GAMES,
          payload: videogames.data
        })
      })
      .catch(error => {
        console.log(error)
      })
  }
}

export function getVGsByQuery(name) {
  return (dispatch) => {
    get(`/api/videogames?name=${name}`)
      .then(videogames => {
        dispatch({
          type: GET_GAMES_BY_QUERY,
          payload: videogames.data
        })
      })
      .catch(error => {
        console.log(error)
        return dispatch({
          type: GET_GAMES_BY_QUERY,
          payload: [{ error_msg: `No games were found!` }]
        })
      })
  }
}

export function getVGByID(id) {
  return async (dispatch) => {
    try {
      const videogame = await get(`/api/videogames/${id}`)
      return dispatch({
        type: GET_GAME_BY_ID,
        payload: videogame.data
      })
    } catch (error) {
      console.log(error)
      return dispatch({
        type: GET_GAME_BY_ID,
        payload: { error_msg: `No games were found!` }
      })
    }
  }
}

export function postVG(postGameData) {
  return async (dispatch) => {
    try {
      const newGame = await post(`/api/videogames/`, postGameData)
      return dispatch({
        type: REDIRECT,
        payload: newGame.data.game.id
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export function getAllGenres() {
  return async (dispatch) => {
    try {
      const genres = await get(`/api/genres/`)
      return dispatch({
        type: GET_GENRES,
        payload: genres.data
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export function putVideogame(putData) {
  console.log(putData)
  return async function (dispatch) {
    try {
      const patchedGame = await put(`/api/videogames/${putData.id}`, putData)
      return dispatch({
        type: REDIRECT,
        payload: patchedGame.data.game.id
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export function deleteVideogame(payload) {
  return async () => {
    try {
      const deletion = del(`/api/videogames/${payload}`)
      return {
        deletion,
        msg: 'Game deleted!'
      }
    } catch (error) {
      console.log(error)
      return {
        error_msg: 'Could not delete game!'
      }
    }
  }
}

export function filterByGenre(payload) {
  return {
    type: FILTER_BY_GENRE,
    payload
  }
}

export function filterBySource(payload) {
  return {
    type: FILTER_BY_SOURCE,
    payload
  }
}

export function sortBy(payload) {
  return {
    type: SORT_BY,
    payload
  }
}

export function clearStateDetail() {
  return {
    type: CLEAR_STATE_DETAIL
  }
}

export function clearStateNavigation() {
  return {
    type: CLEAR_STATE_NAVIGATION
  }
}

// export function getPlatforms(payload) {
//   return {
//     type: GET_PLATFORMS,
//     payload
//   }
// }

// export function clearStateVideogames() {
//   return {
//     type: CLEAR_STATE_GAMES
//   }
// }
