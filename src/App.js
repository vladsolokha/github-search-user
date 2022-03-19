import { useEffect, useState } from 'react'
import './App.css';
import Search from './components/Search'
import Result from './components/Result'

export default function App() {
  const [searchText, setSearchText] = useState('')
  const [url, setUrl] = useState('')
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [resultList, setResultList] = useState([])
  
  function fetchHandle() {
    fetch(`${url}`)
      .then((res) => {res.json()})
      .then((result) => {
          console.log(`result from fetch is: ${result}`)
          setIsLoading(true)
          setResultList(result)
        }, (error) => {
          setIsLoading(true)
          setError(error)
        })
        console.log({url})
        console.log(`result list updated to: ${resultList}`)
    }
    
  
  return (
    <div className="App">
      <header className="App-header">
       GitHub User Search 
      </header>

      <div className='main'>
        <Search 
          searchText={searchText}
          onSetSearchTextChange={setSearchText}
          setUrl={setUrl}
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
