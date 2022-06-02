import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { getVGsByQuery } from '../../store/actions'
import s from '../styles/searchBar.module.css'

export default function SearchBar(props) {
  const { setCurrentPage } = props

  const [search, setSearch] = useState('')
  const dispatch = useDispatch()

  function onInputChange(e) {
    e.preventDefault()
    setSearch(e.target.value)
  }

  function onSubmit(e) {
    e.preventDefault()
    setCurrentPage(1)
    dispatch(getVGsByQuery(search))
    setSearch('')
  }

  return (
    <div>
      <form onSubmit={onSubmit} className={s.formContainer}>
        <input type='text'
          onChange={onInputChange}
          value={search}
          placeholder={'Videogame name...'}
        />
        <button type='submit' className={s.button}>SEARCH</button>
      </form>
    </div>
  )
}