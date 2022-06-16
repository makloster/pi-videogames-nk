import './App.css'
import { Navigate, Route, Routes } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { getAllGenres, getAllGames } from './store/actions'
import { useEffect } from 'react'
import LandingPage from './components/landingPage.jsx'
import Home from './components/home.jsx'
import Detail from './components/detail.jsx'
import Create from './components/createGame.jsx'
import Put from './components/patchGame.jsx'

function App() {
  const dispatch = useDispatch()
  const stateGames = useSelector(state => state.allGames)

  useEffect(() => {
    dispatch(getAllGames())
    dispatch(getAllGenres())
  }, [dispatch, stateGames])

  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/home' element={<Home />} />
        <Route path='/videogame/:id' element={<Detail />} />
        <Route path='/create' element={<Create />} />
        <Route path='/put/:id' element={<Put />} />
        <Route path='/*' element={<Navigate replace to='/home' />} />
      </Routes>
    </div>
  )
}

export default App
