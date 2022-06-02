import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { clearStateDetail, clearStateNavigation, deleteVideogame, getAllVideogames, getVGByID } from '../store/actions'
import Loader from './loader'
import NotFound from './notFound'
import s from './styles/detail.module.css'

export default function Detail() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useParams()
  const game = useSelector(state => state.gameDetail)

  useEffect(() => {
    dispatch(getVGByID(id))
    return () => {
      dispatch(clearStateDetail())
      dispatch(clearStateNavigation())
    }
  }, [dispatch, id])

  function handleDeleteGame(e) {
    e.preventDefault()
    const res = dispatch(deleteVideogame(id))
    if (res.error_msg) alert(`${game.name} could not be deleted!`)
    else {
      dispatch(getAllVideogames())
      alert(`${game.name} was deleted successfully!`)
      navigate('/home')
    }
  }

  return (
    <div style={
      game.name && ({ backgroundImage: `url(${game.image})`, backgroundPositionX: 'center', backgroundSize: 'cover' })
    }>
      <button className={s.backButton} onClick={() => navigate(-1)}>BACK</button>

      {
        game.name
          ? <div className={s.card}>
            <img className={s.img} src={game.image || 'https://i.imgur.com/cahdVGg.png'} alt={game.name} />
            <p className={s.name}>{game.name} — [{game.rating}] </p>
            <p className={s.platforms}>{game.genres?.sort((a, b) => a.localeCompare(b)).join(', ')}</p>
            <p className={s.description}>{game.description}</p>
            <p className={s.relPlat}>Release date: {game.released} — {game.platforms?.sort((a, b) => a.localeCompare(b)).join(', ')}</p>
            <div className={s.createdGames}>
              {
                game.createdInDB
                && <Link to={`/put/${id}`} id={id}>
                  <button
                    className={s.modify}
                    type='button'
                    name='modify'
                  >
                    MODIFY GAME
                  </button>
                </Link>
              }
              {
                game.createdInDB
                && <button
                  className={s.delete}
                  type='button'
                  name='delete'
                  onClick={(e) => handleDeleteGame(e)}
                >
                  DELETE GAME
                </button>}
            </div>
          </div>
          : <div>
            {game.error_msg
              ? <NotFound />
              : <Loader />
            }
          </div>
      }
    </div >
  )
}