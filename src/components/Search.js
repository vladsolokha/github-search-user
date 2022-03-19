export default function Search ({ searchText, onSetSearchTextChange, setUrl, fetchHandle}) {
  return (
    <form onSubmit={(e) => {
      e.preventDefault()
      setUrl(`https://api.github.com/search/users?q=${searchText}`)
      .then(fetchHandle())
    }}>
      <input 
        className='search-bar'
        name='search'
        type='search'
        placeholder='search for user'
        value={searchText}
        onChange={
          (e) => onSetSearchTextChange(e.target.value)} 
      />
      <button
        className='search-button'
        type='submit'
      >Search
      </button>
    </form>

  )
}