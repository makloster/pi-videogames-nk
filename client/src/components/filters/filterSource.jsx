import { useDispatch } from 'react-redux'
import { filterBySource } from '../../store/actions/index'
import s from '../styles/filterSource.module.css'

export default function FilterSource(props) {
  const dispatch = useDispatch()
  const sources = ['Any Source', 'API', 'DB']
  const { setCurrentPage } = props

  const handleSourceChange = (e) => {
    e.preventDefault()
    setCurrentPage(1)
    dispatch(filterBySource(e.target.value))
  }

  return (
    <div>
      <select onChange={handleSourceChange} className={s.filter}>
        {
          sources?.map((c, i) => {
            return (
              <option value={c} key={i}>{c}</option>
            )
          })
        }
      </select>
    </div>
  )
}