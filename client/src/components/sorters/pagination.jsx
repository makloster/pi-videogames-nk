import React from 'react'
import s from '../styles/pagination.module.css'

export default function Pagination({
  vgsPerPage, gamesFromState, pagination, currentPage
}) {
  const pageNumbers = []
  const lastPage = Math.ceil(gamesFromState / vgsPerPage)

  for (let i = 1; i <= lastPage; i++) {
    pageNumbers.push(i)
  }

  return (
    <div>
      {
        pageNumbers.length
          ? <div className={s.numberRow}>
            {
              currentPage !== 1
                ? <button className={s.prevNext} onClick={() => pagination(currentPage - 1)}>←</button>
                : null
            }
            {
              pageNumbers.map((number, i) => (
                <button className={number === currentPage ? s.active : s.number} key={i} onClick={() => pagination(number)}>
                  {number}
                </button>
              ))
            }
            {
              currentPage !== lastPage
                ? <button className={s.prevNext} onClick={() => pagination(currentPage + 1)}>→</button>
                : null
            }
          </div>
          : null
      }
    </div>
  )
}