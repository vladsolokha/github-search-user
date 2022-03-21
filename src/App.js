import { useEffect, useState } from 'react'
import { Octokit } from '@octokit/core'
import './App.css';
import Result from './components/Result'


export default function App() {
  const octokit = new Octokit()
  const [searchText, setSearchText] = useState('')
  const [url, setUrl] = useState('')
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [resultList, setResultList] = useState([])
  const [sortUsers, setSortUsers] = useState('best match')
  const [page, setPage] = useState(1)
  
  useEffect(() => {
    async function fetchHandle() {
      setIsLoading(true)  
      try {
        const result = await octokit.request("GET /search/users", {
          q: `${searchText}`,
          sortUsers: `${sortUsers}`,
          per_page: 10,
          page: `${page}`
        });
        // const result = await axios.get(url)
        setResultList(result.data)
      } catch (error) {
        setError(error)
      }
      setIsLoading(false)
    }
    (searchText !== '') && fetchHandle()
  }, [url])

  useEffect(() => {
    console.log(`searchText is: ${searchText}`)
    console.log(`url is: ${url}`)
    console.log(`isLoading is: ${isLoading}`)
    console.log(`resultList is: ${resultList}`)
  }, [resultList])
  
  return (
    <div className="App">
      <header className="App-header">
       GitHub User Search 
      </header>

      <div className='main'>
        {/* This Form can be placed in another component */}
        <form onSubmit={ (e) => {
            e.preventDefault()
            setUrl(`https://api.github.com/search/users?q=${searchText}`)
          }}>
          <input 
            className='search-bar'
            name='search'
            type='search'
            placeholder='search for user'
            value={searchText}
            onChange={
              (e) => setSearchText(e.target.value)} 
          />
          <button
            className='search-button'
            type='submit'
          >Search
          </button>
        </form>
        
        {/* <Error error={error} /> */}

        <div className='sort-nav'>
              
        </div>

        <div className='pagination'>
            
        </div>

        <Result 
          error={error}
          isLoaded={isLoading}
          resultList={resultList}
        />


      </div>
    </div>
  );
}
