export default function Search ({ searchText, onSetSearchTextChange, fetchHandle}) {
  return (
    <form onSubmit={ async (e) => {
      e.preventDefault()
      fetchHandle()
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