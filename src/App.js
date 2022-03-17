
import './App.css';
import Search from './components/Search'
import Result from './components/Result'


export default function App() {
  
  // const [user, setUser] = useState('')
  // const url = `https://api.github.com/search/users?q=${user}`
  

  return (
    <div className="App">
      <header className="App-header">
       GitHub User Search 
      </header>

      <div className='main'>
        <Search />
        <Result />
      </div> 

    </div>
  );
}
