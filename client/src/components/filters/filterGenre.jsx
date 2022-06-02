import { useDispatch, useSelector } from 'react-redux'
import { filterByGenre } from '../../store/actions/index'
import s from '../styles/filterGenre.module.css'

export default function FilterGenre(props) {
  const dispatch = useDispatch()
  const genres = useSelector(state => state.genres)
  const { setCurrentPage } = props
 
  const handleGenreChange = (e) => {
    e.preventDefault()
    setCurrentPage(1)
    dispatch(filterByGenre(e.target.value))
  }

  return (
    <div>
      <select onChange={handleGenreChange} className={s.filter}>
      <option value={'All Genres'} key={'All Genres'}>All Genres</option>
        {genres?.map((g, i) => {
          return (
            <option value={g} key={i}>{g}</option>
          )
        })}
      </select>
    </div>
  )
}