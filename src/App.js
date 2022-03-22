import { useEffect, useMemo, useState } from 'react'
import { Octokit } from '@octokit/core'
import './App.css';
import './components/Search.css'
import Result from './components/Result'


export default function App() {  
  const [searchText, setSearchText] = useState('')
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [resultList, setResultList] = useState([])
  const [sortUsers, setSortUsers] = useState('best%20match')
  const [page, setPage] = useState(1)
  const per_page = 10
  const [url, setUrl] = useState('')

  const totalCount = resultList.total_count
  const totalPages = totalCount/10;

  const refreshPage = () => {
    window.location.reload()
  }

  const octokit = new Octokit({})
  const request = octokit.request("GET /search/users", {
    q: `${searchText}`,
    sort: `${sortUsers}`,
    per_page: `${per_page}`,
    page: `${page}`
  });





  const onPageChange = () => {

  }
  useMemo(() => {
  }, [])

  useEffect(() => {
    async function fetchHandle() {
      setIsLoading(true)

      try {
        const result = await {request}
        // const result = await axios.get(url)
        setResultList(result.data)
      } catch (error) {
        setError(error)
      }
      setIsLoading(false)
    }
    fetchHandle()
  }, [])


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
              setUrl(`https://api.github.com/search/users?q=${searchText}&sort=${sortUsers}&per_page=${per_page}&page=${page}`)
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
          <label for="sort by">Sort by: </label>
            <select 
              name='sort' 
              onChange={(e) => {setSortUsers(e.target.value)}}
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
        </div>
      </div>
      {/* <Error error={error} /> */}

      <Result 
        error={error}
        isLoaded={isLoading}
        resultList={resultList}
      />

    </div>
  );
}
