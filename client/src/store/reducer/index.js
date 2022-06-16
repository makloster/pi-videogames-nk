import { GET_GAME_BY_ID, GET_GAMES_BY_QUERY, GET_ALL_GAMES, GET_GENRES, SORT_BY, FILTER_BY_GENRE, FILTER_BY_SOURCE, CLEAR_STATE_DETAIL, CLEAR_STATE_NAVIGATION, REDIRECT, NAME_ASC, NAME_DESC, RATING_ASC, RATING_DESC } from '../consts'

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

      case GET_ALL_GAMES:
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

      case SORT_BY:
         let nameSorted = [...state.filteredGames]

         if (action.payload === NAME_ASC) {
            nameSorted.sort((a, b) => a.name.localeCompare(b.name))
         }
         if (action.payload === NAME_DESC) {
            nameSorted.sort((a, b) => b.name.localeCompare(a.name))
         }
         if (action.payload === RATING_ASC) {
            nameSorted.sort((a, b) =>
               a.rating !== b.rating
                  ? a.rating - b.rating
                  : a.name.localeCompare(b.name)
            )
         }
         if (action.payload === RATING_DESC) {
            nameSorted.sort((a, b) =>
               a.rating !== b.rating
                  ? b.rating - a.rating
                  : b.name.localeCompare(a.name)
            )
         }
         return {
            ...state,
            filteredGames: nameSorted
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