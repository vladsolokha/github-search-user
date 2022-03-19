import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css';
import Search from './components/Search'
import Result from './components/Result'


export default function App() {
  const [searchText, setSearchText] = useState('')
  const [url, setUrl] = useState('')
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [resultList, setResultList] = useState([])
  
  async function fetchHandle() {
    setUrl(`https://api.github.com/search/users?q=${searchText}`)

    setIsLoading(true)

    try {
      const result = await axios.get(url)
      setResultList(result.data)
    } catch (error) {
      setError(error)
    }

    setIsLoading(false)
  }  
  
  return (
    <div className="App">
      <header className="App-header">
       GitHub User Search 
      </header>

      <div className='main'>
        <form onSubmit={(e) => {
            fetchHandle()
            e.preventDefault()
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


        <Result 
          error={error}
          isLoaded={isLoading}
          resultList={resultList}
        />
      </div>
    </div>
  );
}
