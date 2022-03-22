import React from 'react'
import { usePagination, DOTS } from '../hooks/usePagination'

const Pagination = props => {
  const {
    totalCount,
    siblingCount = 3,
    currentPage,
    per_page,
    onPageChange
  } = props;

  const paginationRange = usePagination({
    totalCount,
    per_page,
    siblingCount,
    currentPage
  });

  // If there are less than 2 times in pagination range we shall not render the component
  // if (currentPage === 0 && paginationRange < 2) {
  //   return null
  // }

  const onNext = () => {
    onPageChange(currentPage + 1)
  }

  const onPrevious = () => {
    onPageChange(currentPage - 1)
  }

  return (
    <ul className='pagination-container'>
       {/* Left navigation arrow */}
      <li
        className='pagination-item'
        onClick={onPrevious}
      >
        <div className="arrow-left" />
      </li>
      {paginationRange.map(pageNumber => {
         
        // If the pageItem is a DOT, render the DOTS unicode character
        if (pageNumber === DOTS) {
          return (
            <li  
              className="pagination-item-dots"
            >
              &#8230;
            </li>
          )
        }
		
        // Render our Page Pills
        return (
          <li
            className='pagination-item'
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </li>
        )
      })}
      {/*  Right Navigation arrow */}
      <li
        className='pagination-item'
        onClick={onNext}
      >
        <div className="arrow-right" />
      </li>
    </ul>
  )
}

export default Pagination