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
      const result = await axios(`${url}`)
      setResultList(result.data)
      console.log('this is results: ' + result.data)
    } catch (error) {
      setError(error)
    }

    setIsLoading(false)
  }  

  useEffect(() => {
    console.log('resultList' + {resultList})
    console.log('url' + {url})
    console.log('searchText' + {searchText})

  }, [url])
  
  return (
    <div className="App">
      <header className="App-header">
       GitHub User Search 
      </header>

      <div className='main'>
        <Search 
          searchText={searchText}
          onSetSearchTextChange={setSearchText}
          fetchHandle={() => {fetchHandle()}}
        />

        <Result 
          error={error}
          isLoaded={isLoading}
          resultList={resultList}
        />
      </div> 

    </div>
  );
}
