import React from 'react'
import { usePagination, DOTS } from '../hooks/usePagination'
import './Pagination.css'

const Pagination = props => {
  // Props coming in from App component
  const {
    totalCount,
    siblingCount = 1,
    currentPage,
    per_page,
    onPageChange
  } = props;

  // Store list of range of pages from pagination hook
  const paginationRange = usePagination({
    // Props being sent to pagination hook
    totalCount,
    per_page,
    siblingCount,
    currentPage
  });

  // Next page handler, if page is last page, change page to last page, don't go past the last page.
  const onNext = () => {
    if (currentPage >= paginationRange.length) {
      onPageChange(paginationRange.length)
    } else {
      onPageChange(currentPage + 1)
    }
  }
  // Previous page handler, if page is first page, change page to 1, don't go past the first page.
  const onPrevious = () => {
    if (currentPage <= 1) {
      onPageChange(1)
    } else {
      onPageChange(currentPage - 1)
    }
  }

  // Don't return/render pages component if the result count is 10 or less.
  if (totalCount <= 10) {
    return null
  } else {
  
  return (
    <div>
    <div className='page-text'>Pages</div>
    <ul className='pagination-container'>
      {/* Left navigation arrow don't display if page is 1 */}
      {currentPage !== 1 ? (
        <li
          key='left-arrow'
          className='pagination-item'
          onClick={onPrevious}
        >
          <div className="arrow-left" />
        </li>
        ) : (null)
      }
      {/* Map through range of pages */}
      {paginationRange.map(pageNumber => {
         
        // If the pageItem is a DOT, render the DOTS unicode character
        if (pageNumber === DOTS) {
          return (
            <li key='dots' className="pagination-item-dots">
              - - -
            </li>
          )
        }
		
        // Render our Page Pills
        return (
          <li
            key={pageNumber}
            className='pagination-item'
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </li>
        )
      })}
      {/*  Right Navigation arrow don't display if page is last */}
      {currentPage !== paginationRange.length ? (
        <li
          key='right-arrow'
          className='pagination-item'
          onClick={onNext}
        >
          <div className="arrow-right" />
        </li>
        ) : (<div/>)
      }
    </ul>
    </div>
  )
}
}

export default Pagination