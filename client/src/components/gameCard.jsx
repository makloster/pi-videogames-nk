import { Link } from 'react-router-dom'
import s from './styles/gameCard.module.css'

export default function Videogame({ name, id, image, rating, genres }) {
  return (
    <div className={s.card} key={id}>
      <div id='img'>
        <Link to={`/videogame/${id}`}>
          {<img className={s.img} src={image || 'https://i.imgur.com/cahdVGg.png'} alt={`${name}`} />}
        </Link>
      </div>
      <div id='text'>
        <p className={s.name}>{name} — [{rating}] </p>
        <p className={s.genres}>{genres?.sort((a, b) => a.localeCompare(b)).join(', ')}</p>
      </div>
    </div>
  )
}