import { useDispatch } from 'react-redux'
import { NAME_ASC, NAME_DESC, RATING_ASC, RATING_DESC } from '../../store/consts'
import { sortBy } from '../../store/actions'
import s from '../styles/sorter.module.css'

export default function Sort(props) {
  const dispatch = useDispatch()
  const { setCurrentPage } = props
  
  function onSelectChange(e) {
    e.preventDefault()
    setCurrentPage(1)
    dispatch(sortBy(e.target.value))    
  }
  return (
    <div className={s.sortBy}>
      <select name='select' defaultValue='default' onChange={onSelectChange}>
        <option disabled value='default'>Sort alphabetically</option>
        <option value={NAME_ASC}>A-Z</option>
        <option value={NAME_DESC}>Z-A</option>
        <option disabled value='default'>Sort by Rating</option>
        <option value={RATING_DESC}>Higher-Lower</option>
        <option value={RATING_ASC}>Lower-Higher</option>
      </select>
    </div>
  )
}