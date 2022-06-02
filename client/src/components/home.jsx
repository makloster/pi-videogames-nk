import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import GameCard from './gameCard'
import Pagination from './sorters/pagination'
import SearchBar from './filters/searchBar'
import FilterGenre from './filters/filterGenre'
import FilterSource from './filters/filterSource'
import SorterName from './sorters/sorterName'
import SorterRating from './sorters/sorterRating'
import Loader from './loader'
import NotFound from './notFound'
import s from './styles/home.module.css'

export default function Home() {
  const gamesFromState = useSelector(state => state.filteredGames)

  const [currentPage, setCurrentPage] = useState(1)
  const [vgsPerPage, ,] = useState(15)
  const lastGameIndex = currentPage * vgsPerPage
  const firstGameIndex = lastGameIndex - vgsPerPage
  const currentGames = gamesFromState.slice(firstGameIndex, lastGameIndex)
  const pagination = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  return (
    <div id='container' className={s.container}>

      <h1 className={s.title}>The Games App!</h1>

      <div id='navBarA' className={s.navBar}>
        <SearchBar className={s.SearchBar} setCurrentPage={setCurrentPage} />
        <FilterGenre className={s.order} setCurrentPage={setCurrentPage} />
        <FilterSource className={s.order} setCurrentPage={setCurrentPage} />
        <div id='navBarB' className={s.navBar}>
          <SorterName className={s.order} setCurrentPage={setCurrentPage} />
          <SorterRating className={s.order} setCurrentPage={setCurrentPage} />
          <Link to='/create'><button className={s.createButton}>CREATE GAME</button></Link>
        </div>

      </div>

      <div id='pagination' className={s.pagination}>
        {
          gamesFromState.length > 15
            ? <Pagination
              vgsPerPage={vgsPerPage}
              gamesFromState={gamesFromState.length}
              pagination={pagination}
              currentPage={currentPage}
            />
            : null
        }
      </div>

      {
        gamesFromState[0]?.error_msg
          ? <NotFound />
          : gamesFromState.length
            ? <div id='contents' className={s.contents}>
              {currentGames?.map((vg, i) => {
                return (
                  <GameCard
                    key={i}
                    id={vg.id}
                    image={vg.image}
                    name={vg.name}
                    rating={vg.rating}
                    genres={vg.genres}
                    createdInDB={vg.createdInDB}
                  />
                )
              })}
            </div>
            : <Loader />
      }
    </div >
  )
}