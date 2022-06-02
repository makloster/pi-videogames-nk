import { useDispatch } from 'react-redux'
import { ASCENDENT, DESCENDENT } from '../../store/consts'
import { sortByName } from '../../store/actions'
import s from '../styles/sorterName.module.css'

export default function Sort(props) { // TODO una función externa que importe para cada sort?
  const dispatch = useDispatch()
  const { setCurrentPage } = props
  
  function onSelectChange(e) {
    e.preventDefault()
    setCurrentPage(1)
    dispatch(sortByName(e.target.value))    
  }
  return (
    <div className={s.sortByName}>
      <select name='select' defaultValue='default' onChange={onSelectChange}>
        <option disabled value='default'>Sort alphabetically</option>
        <option value={ASCENDENT}>A-Z</option>
        <option value={DESCENDENT}>Z-A</option>
      </select>
    </div>
  )
}