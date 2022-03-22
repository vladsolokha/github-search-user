import { useEffect, useState } from 'react'
import { Octokit } from '@octokit/core'
import './App.css';
import './components/Search.css'
import Result from './components/Result'
import Pagination from './components/Pagination';


export default function App() {  

  const octokit = new Octokit({})

  const [searchText, setSearchText] = useState('')
  const [error, setError] = useState(null)
  const [isError, setIsError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [resultList, setResultList] = useState([])
  const [sortUsers, setSortUsers] = useState('best%20match')
  const [currentPage, setCurrentPage] = useState(1)
  const per_page = 10
  const [url, setUrl] = useState(null)

  const totalCount = resultList.total_count

  const refreshPage = () => {
    window.location.reload()
  }


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
        // const result = await axios.get(url)
        setResultList(result.data)
      } catch (error) {
        setIsError(true)
        setError(error)
      }
      setIsLoading(false)
      setIsError(false)
    }
    if (url !== null) fetchHandle()
    // run fetchHandle if sortUsers has changed value
  }, [url])


  useEffect(() => {
    console.log(`searchText is: ${searchText}`)
    console.log(`url is: ${url}`)
    console.log(`isLoading is: ${isLoading}`)
    console.log(`resultList is: ${resultList}`)
    console.log(`sortUsers is: ${sortUsers}`)
  }, [resultList])
  
  return (
    <div className="App">
      <header className="App-header" onClick={refreshPage}>
       GitHub User Search 
      </header>

      <div className='user-inputs'>
        {/* This Form can be placed in another component */}
        <div className='form-container'>
          <form name='search' onSubmit={ (e) => {
              e.preventDefault()
              setUrl(`https://api.github.com/search/users?q=${searchText}&sort=${sortUsers}&per_page=${per_page}&page=${currentPage}`)
            }}>
            <input
              className='search-bar'
              name='search'
              type='search'
              placeholder='search...'
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
        <div className='filter-bar'>
          <label htmlFor="sort by">Sort by: </label>
            <select 
              name='sort' 
              value={sortUsers}
              onChange={(sortUsers) => {
                setSortUsers(sortUsers)}}
            >
              <option value='best%20match'>Best Match</option>
              <option value='followers'>Followers</option>
              <option value='repositories'>Repositories</option>
              <option value='joined'>Joined Date</option>
            </select>
        </div>
      </div>
        
      {/* total and page section */}
      <div className='total-pagination-section'>
        <div className='total-count'>
          Total Results: {totalCount}
        </div>
      
        <div className='pagination'> 
          if (url !== null) {<Pagination 
            className='pagination'
            totalCount={totalCount}
            currentPage={currentPage}
            per_page={per_page}
            onPageChange={page => setCurrentPage(page)}
          />}}
        </div>
      </div>
      {/* <Error error={error} /> */}

      <Result 
        error={error}
        isError={isError}
        isLoaded={isLoading}
        resultList={resultList}
      />

    </div>
  );
}
