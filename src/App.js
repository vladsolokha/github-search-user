import { useEffect, useState } from 'react'
import { Octokit } from '@octokit/core'
import './App.css';
import Result from './components/Result'
import Pagination from './components/Pagination';

export default function App() {  
  const octokit = new Octokit({})
  // Gets set to false after first useEffect fetchHandle
  const [initialState, setInitialState] = useState(true)

  // Flags for loading and error states
  const [error, setError] = useState(null)
  const [isError, setIsError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  
  // Input states for search query, results list, sorting, and pagination
  const [searchText, setSearchText] = useState('')
  const [resultList, setResultList] = useState([])
  const [sortUsers, setSortUsers] = useState('best%20match')
  const [currentPage, setCurrentPage] = useState(1)
  
  const per_page = 100
  const totalCount = resultList.total_count

  // Controller for fetching data from API
  const [url, setUrl] = useState(null)

  // When header is clicked, the app is refreshed
  const refreshPage = () => {
    setInitialState(true)
    window.location.reload()
  }
  // When user clicks on search button, or changes sort, url is changed
  // thus activating the useEffect to fetch data
  const refreshResults = (e) => {
    e.preventDefault()
    setSortUsers(e.target.value)
    setUrl(`https://api.github.com/search/users?q=${searchText}&sort=${sortUsers}&per_page=${per_page}&page=${currentPage}`)
  }

  // When user clicks on a page, the url state is changed
  // thus useEffect is triggered. Alternative to the refreshResults
  const fetchNewPageHandle = (e) => {
    setCurrentPage(e)
    setUrl(`https://api.github.com/search/users?q=${searchText}&sort=${sortUsers}&per_page=${per_page}&page=${currentPage}`)
  }

  // fetching logic using octokit to search users
  // isLoading and errors are logged from here
  useEffect(() => {
    async function fetchHandle() {
      setIsLoading(true)

      try {
        const result = await octokit.request("GET /search/users", {
          q: `${searchText}`,
          sort: `${sortUsers}`,
          per_page: `${per_page}`,
          page: `${currentPage}`
        });
        setResultList(result.data)
      
      } catch (error) {
        setIsError(true)
        setError(error)
      }

      setIsLoading(false)
      setIsError(false)
      // change initial state after first fetch
      setInitialState(false)
    }
    // Fetch only if url has been set to some string
    if (url !== null && searchText !== '') fetchHandle()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url])
  
  return (
    <div className="App">
      {/* Header section */}
      <header className="App-header" onClick={refreshPage}>
       GitHub User Search 
      </header>

      {/* Search section */}
      <div className='user-inputs'>
        <div className='form-container'>
          <form name='search' onSubmit={(e) => {refreshResults(e)}}>
            <input
              className='search-bar'
              name='search'
              type='search'
              placeholder='search here'
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)} 
            />
            <button
              className='search-button'
              type='submit'
            >Search
            </button>
          </form>
        </div>

          {/* Sort bar appears after first fetch effect */}
          {!initialState && 
            <div className='filter-bar'>
              <label htmlFor="sort by">Sort by: </label>
                <select 
                  name='sort' 
                  value={sortUsers}
                  onChange={(e) => {refreshResults(e)}}
                >
                  <option value='best%20match'>Best Match</option>
                  <option value='followers'>Followers</option>
                  <option value='repositories'>Repositories</option>
                  <option value='joined'>Joined Date</option>
                </select>
            </div>
          }
      </div>
      {/* End of search section */}
      
      {/* Display results when there are some  */}
      {totalCount === 0 ? (
        <div className='no-results'>
          No Results Found for '{searchText}'
        </div>
      ) : (
        // Go to result component 
        <Result 
          error={error}
          isError={isError}
          isLoaded={isLoading}
          resultList={resultList}
        />
      )}
      {/* End results section  */}
        
      {/* Total results and page section */}
      <div className='total-pagination-section'>
        <div className='pagination'> 
          {!initialState ? (
            <Pagination 
            totalCount={totalCount}
            currentPage={currentPage}
            per_page={per_page}
            onPageChange={(e) => fetchNewPageHandle(e)}
            />
            ) : (null)
          }
          {!initialState &&
            <div className='total-count'>
              Total Results: {totalCount}
            </div>
          }
        </div>
      </div>
      {/* End total results and page section  */}
    </div> // end app
  ); // close return
} // close App function
