import './Pagination.css'

const Pagination = props => {
  // Props coming in from App component
  const {
    totalCount,
    currentPage,
    per_page,
    onPageChange
  } = props;

  const paginationRange = Math.ceil(totalCount/per_page)
  const displayLowResult = (currentPage*per_page)-(per_page-1)
  const displayHighResult = (currentPage*per_page)


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
      <div className='page-text'>
        Current Page: {currentPage}<br/>
        Displaying Results: {displayLowResult} of {displayHighResult}<br/>
      </div>
      <div className='pagination-container'>
        {/* Previous Page button, don't display if page is first*/}
        {currentPage !== 1 ? (
          <button
            className='pagination-item'
            onClick={onPrevious}
          >
            Prev Page
          </button>
          ) : (null)
        }        
        {/*  Next Page button, don't display if page is last */}
        {currentPage !== paginationRange.length ? (
          <button        
            className='pagination-item'
            onClick={onNext}
          >
            Next Page
          </button>
          ) : (<div/>)
        }
      </div>
    </div>
  )
}
}

export default Pagination