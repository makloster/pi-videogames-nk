import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getAllVideogames, putVideogame } from '../store/actions'
import s from './styles/patchGame.module.css'

export default function Put() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const game = useSelector(state => state.gameDetail)
  const allGames = useSelector(state => state.allGames)
  const allGenres = useSelector(state => state.genres)
  const navigation = useSelector(state => state.navigation)

  const platformsFromState = allGames?.map(p => p.platforms).flat()
  const platformsToSet = new Set(platformsFromState)
  const platformsToArray = [...platformsToSet]
  const allPlatforms = platformsToArray.sort((a, b) => a.localeCompare(b))

  const [errors, setErrors] = useState({})

  const [genreList, setGenreList] = useState({
    remaining: []
  })

  const [platformList, setPlatformList] = useState({
    remaining: []
  })

  const [input, setInput] = useState({
    name: game.name,
    description: game.description,
    rating: game.rating,
    released: game.released,
    image: game.image,
    platforms: game.platforms,
    genres: game.genres,
  })
  
  useEffect(() => {
    navigation.length && navigate(`/videogame/${navigation}`)
  }, [navigation, navigate])

  useEffect(() => {
    setGenreList({
      remaining: [...allGenres]
    })
  }, [allGenres])

  const [check, setCheck] = useState({
    platforms: true
  })

  useEffect(() => {
    if (check.platforms && allPlatforms.length) {
      setPlatformList({
        remaining: [...allPlatforms]
      })
      setCheck({
        platforms: false
      })
    }
  }, [check.platforms, allPlatforms])

  useEffect(() => {
    let errors = {}

    !input.name
      ? errors.name = 'A name is required.'
      : (!/^\S.*$/.test(input.name))
        ? errors.name = "The first character can't be a space"
        : input.name.length > 100
          ? errors.name = 'Please enter a name of up to 100 characters.'
          : errors.name = ''

    input.description.toString().length < 6
      ? errors.description = 'The description must have at least 6 characters.'
      : input.description.length > 1500
        ? errors.description = 'Please enter a description of up to 1500 chars.'
        : errors.description = ''

    input.rating.toString().includes(',')
      ? errors.rating = 'Please use a dot (.) instead of a comma.'
      : input.rating && (input.rating > 5 || input.rating.toString().length > 4 || isNaN(input.rating))
        ? errors.rating = 'Please enter a number from 0 to 5, including two decimals.'
        : errors.rating = ''

    input.released.length > 0 && (!/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/.test(input.released))
      ? errors.released = 'Release date format is YYYY-MM-DD.'
      : errors.released = ''

    input.image.length > 0 && (!/^(https?:\/\/.*\.(?:png|jpg|jpeg|svg))$/.test(input.image))
      ? errors.image = 'Image requires a valid file URL ending in png, jpg, jpeg or svg.'
      : errors.image = ''

    if (!input.platforms.length) errors.platforms = 'Please select at least one platform.'
    else errors.platforms = ''

    setErrors(errors)
  }, [input.name, input.description, input.rating, input.released, input.image, input.platforms])

  const handleInputChange = function (e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
  }

  function handleSelectPlatform(e) {
    e.preventDefault()
    if (input.platforms.indexOf(e.target.value) === -1) {
      setInput({
        ...input,
        platforms: [...input.platforms, e.target.value].sort((a, b) => a.localeCompare(b))
      })
      setPlatformList({
        remaining: platformList.remaining.filter(g => g !== e.target.value)
      })
    }
  }

  function handleDeletePlatform(e) {
    e.preventDefault()
    setInput({
      ...input,
      platforms: input.platforms.filter(g => g !== e.target.name)
    })
    setPlatformList({
      remaining: [...platformList.remaining, e.target.name].sort((a, b) => a.localeCompare(b))
    })
  }

  function handleSelectGenre(e) {
    e.preventDefault()
    if (input.genres.indexOf(e.target.value) === -1) {
      setInput({
        ...input,
        genres: [...input.genres, e.target.value].sort((a, b) => a.localeCompare(b))
      })
      setGenreList({
        remaining: genreList.remaining.filter(g => g !== e.target.value)
      })
    }
  }

  function handleDeleteGenre(e) {
    e.preventDefault()
    setInput({
      ...input,
      genres: input.genres.filter(g => g !== e.target.name)
    })
    setGenreList({
      remaining: [...genreList.remaining, e.target.name].sort((a, b) => a.localeCompare(b))
    })
  }

  function handleSubmit(e) {
    e.preventDefault()
    dispatch(putVideogame(input))
    dispatch(getAllVideogames())
    alert('Videogame modified successfully!')
    setInput({
      name: '',
      description: '',
      released: '',
      rating: '',
      image: '',
      genres: [],
      platforms: []
    })
  }

  return (
    <div className={s.background}>
      <button className={s.backButton} onClick={() => navigate(-1)}>BACK</button>
      <div className={s.content}>
        <h1 className={s.title}>MODIFYING {game.name}!</h1>

        <form className={s.form} onSubmit={(e) => handleSubmit(e)} >
          <div className={s.fields}>

            <div className={s.rows}>
              <label className={s.label}>Name: </label>
              <input
                name='name'
                type='text'
                value={input.name}
                onChange={e => handleInputChange(e)}
              />
            </div>
            {errors.name && (
              <p className={s.danger}>{errors.name}</p>
            )}

            <div className={s.rows}>
              <label className={s.label}>Description: </label>
              <input
                className={s.description}
                name='description'
                type='text'
                value={input.description}
                onChange={e => handleInputChange(e)}
              />
            </div>
            {errors.description && (
              <p className={s.danger}>{errors.description}</p>
            )}

            <div className={s.rows}>
              <label className={s.label}>Rating (0-5): </label>
              <input
                name='rating'
                type='text'
                value={input.rating}
                onChange={e => handleInputChange(e)}
              />
            </div>
            {errors.rating && (
              <p className={s.danger}>{errors.rating}</p>
            )}

            <div className={s.rows}>
              <label className={s.label}>Release date: </label>
              <input
                name='released'
                type='text'
                value={input.released}
                onChange={e => handleInputChange(e)}
              />
            </div>
            {errors.released && (
              <p className={s.danger}>{errors.released}</p>
            )}

            <div className={s.rows}>
              <label className={s.label}>Image URL: </label>
              <input
                name='image'
                type='text'
                value={input.image}
                onChange={e => handleInputChange(e)}
              />
            </div>
            {errors.image && (
              <p className={s.danger}>{errors.image}</p>
            )}

            <div className={s.rows}>
              <label className={s.label}>Platforms: </label>
              <select defaultValue={'def'} onChange={(e) => handleSelectPlatform(e)} className={s.select}>
                <option value={'def'} disabled={platformList.remaining.length > 1}>
                  Select platforms...
                </option>
                {platformList.remaining?.map((g, i) => (
                  <option key={i} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </div>
            {errors.platforms && (
              <p className={s.danger}>{errors.platforms}</p>
            )}

            <div className={s.platGenres}>
              {input.platforms?.map((g, i) => (
                <div className={s.element} key={i}>
                  <p>{g}</p>
                  <button
                    type='button'
                    name={g}
                    onClick={(g) => handleDeletePlatform(g)}
                  >
                    X
                  </button>
                </div>
              ))}
            </div>

            <div className={s.rows}>
              <label className={s.label}>Genres: </label>
              <select defaultValue={'def'} onChange={e => handleSelectGenre(e)} className={s.select}>
                <option value={'def'} disabled={genreList.remaining.length > 1}>
                  Select genres...
                </option>
                {genreList.remaining?.map((g, i) => (
                  <option key={i} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </div>

            <div className={s.platGenres}>
              {input.genres?.map((g, i) => (
                <div className={s.element} key={i}>
                  <p>{g}</p>
                  <button
                    type='button'
                    name={g}
                    onClick={(g) => handleDeleteGenre(g)}
                  >
                    X
                  </button>
                </div>
              ))}
            </div>

            <input
              className={s.submit}
              disabled={errors.name || errors.description || errors.platforms || errors.rating || errors.released || errors.image}
              type='submit'
            />

          </div>
        </form>
      </div >
    </div >
  )
}