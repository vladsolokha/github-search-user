import {useMemo} from 'react'

export const DOTS = '...'

const range = (start, end) => {
  let length = end - start + 1
  return Array.from({ length }, (_, idx) => idx + start)
};

export const usePagination = ({
  totalCount,
  per_page,
  siblingCount = 3,
  currentPage
}) => {
  const paginationRange = useMemo(() => {
    // Calculate total page count
    const totalPageCount = Math.ceil(totalCount / per_page)
    const totalPageNumbers = siblingCount + 5

    // Return no dot range, all pages present, not too many pages
    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount)
    }

    // initialize variables where the dots should be
    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1)
    const rightSiblingIndex = Math.min(
      currentPage + siblingCount,
      totalPageCount
    )

    const shouldShowLeftDots = leftSiblingIndex > 2
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2

    const firstPageIndex = 1
    const lastPageIndex = totalPageCount

    // No left dots to show, only right dots.
    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = 3 + 2 * siblingCount
      let leftRange = range(1, leftItemCount)

      return [...leftRange, DOTS, totalPageCount]
    }

    // No right dots to show, only left dots.
    if (shouldShowLeftDots && !shouldShowRightDots) {
      
      let rightItemCount = 3 + 2 * siblingCount
      let rightRange = range(
        totalPageCount - rightItemCount + 1,
        totalPageCount
      );
      return [firstPageIndex, DOTS, ...rightRange]
    }

    // both left and right dots to show.
    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex)
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex]
    }

      
  }, [totalCount, per_page, siblingCount, currentPage])

  return paginationRange
}