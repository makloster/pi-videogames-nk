import { useDispatch } from 'react-redux'
import { ASCENDENT, DESCENDENT } from '../../store/consts'
import { sortByRating } from '../../store/actions'
import s from '../styles/sorterRating.module.css'

export default function Sort(props) { // TODO una función externa que importe para cada sort?
  const dispatch = useDispatch()
  const { setCurrentPage } = props
  
  function onSelectChange(e) {
    e.preventDefault()
    setCurrentPage(1)
    dispatch(sortByRating(e.target.value))    
  }
  return (
    <div className={s.sortByRating}>
      <select name='select' defaultValue='default' onChange={onSelectChange}>
        <option disabled value='default'>Sort by Rating</option>
        <option value={DESCENDENT}>Higher-Lower</option>
        <option value={ASCENDENT}>Lower-Higher</option>
      </select>
    </div>
  )
}