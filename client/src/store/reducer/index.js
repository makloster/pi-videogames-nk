import { GET_GAME_BY_ID, GET_GAMES_BY_QUERY, GET_ALL_VIDEOGAMES, GET_GENRES, SORT_BY_NAME, SORT_BY_RATING, ASCENDENT, FILTER_BY_GENRE, FILTER_BY_SOURCE, CLEAR_STATE_DETAIL, CLEAR_STATE_NAVIGATION, REDIRECT } from '../consts'

const initialState = {
   allGames: [],
   filteredGames: [],
   gameDetail: [],
   // platforms: [],
   genres: [],
   navigation: []
}

export default function reducer(state = initialState, action) {
   switch (action.type) {

      case GET_ALL_VIDEOGAMES:
         if (action.payload.length !== state.allGames.length) {
            return {
               ...state,
               allGames: action.payload,
               filteredGames: action.payload
            }
         }
         return { ...state }

      case GET_GAMES_BY_QUERY:
         return {
            ...state,
            filteredGames: action.payload
         }

      case GET_GAME_BY_ID:
         return {
            ...state,
            gameDetail: action.payload
         }

      case REDIRECT:
         return {
            ...state,
            navigation: action.payload
         }

      case GET_GENRES:
         const genresPayload = action.payload.map(gen => gen.name)
         return {
            ...state,
            genres: genresPayload
         }

      case SORT_BY_NAME:
         let nameSorting = [...state.filteredGames]
         action.payload === ASCENDENT
            ? nameSorting.sort((a, b) => a.name.localeCompare(b.name))
            : nameSorting.sort((a, b) => b.name.localeCompare(a.name))
         return {
            ...state,
            filteredGames: nameSorting
         }

      case SORT_BY_RATING:
         let ratingSort = [...state.filteredGames]
         ratingSort.sort((a, b) => {
            if (a.rating !== b.rating) return action.payload === ASCENDENT ? a.rating - b.rating : b.rating - a.rating
            else return action.payload === ASCENDENT ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
         })
         return {
            ...state,
            filteredGames: ratingSort
         }

      case FILTER_BY_GENRE:
         const genreFiltering = action.payload === 'All Genres'
            ? state.allGames
            : state.allGames.filter(g => g.genres.includes(action.payload))
         const filteredGenre = genreFiltering.length
            ? genreFiltering
            : [{ error_msg: 'The filter did not find any games!' }]
         return {
            ...state,
            filteredGames: filteredGenre
         }

      case FILTER_BY_SOURCE:
         const sourceFiltering = action.payload === 'Any Source'
            ? state.allGames
            : action.payload === 'DB'
               ? state.allGames.filter(c => c.createdInDB)
               : state.allGames.filter(c => !c.createdInDB)
         const filteredSource = sourceFiltering.length
            ? sourceFiltering
            : [{ error_msg: 'The filter did not find any games!' }]
         return {
            ...state,
            filteredGames: filteredSource
         }

      case CLEAR_STATE_NAVIGATION:
         return {
            ...state,
            navigation: []
         }

      case CLEAR_STATE_DETAIL:
         return {
            ...state,
            gameDetail: []
         }

      // case GET_PLATFORMS:
      //    console.log(action.payload)
      //    const platformsFromState = action.payload?.map(p => p.platforms).flat()
      //    const platformsToSet = new Set(platformsFromState)
      //    const platformsToArray = [...platformsToSet]
      //    const allPlatforms = platformsToArray.sort((a, b) => a.localeCompare(b))
      //    console.log(allPlatforms)
      //    return {
      //       ...state,
      //       platforms: allPlatforms
      //    }

      // case CLEAR_STATE_GAMES:
      //    return {
      //       ...state,
      //       filteredGames: []
      //    }

      default:
         return { ...state }
   }
}