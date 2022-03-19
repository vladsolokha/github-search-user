import './Result.css'

export default function Result ({ error, isLoading, resultList }) {
  const totalCount = () => {
    resultList.totalCount?.map(item => item.total_count)
  }

  if (error) {
    return (
      <div>
        Something went wrong...    
        <br/>
        Error: {error.message}
      </div>
    )
  } else if (isLoading) {
    <div>Loading users...</div> 
  } else {
    return (
      <div className='results'>
        <div className='total-count'>
          Total Results: {totalCount}        
        </div>
                
        <div className='user containers'>
          <ul>
            {resultList.items?.map(item => (
              <li key={item.id}>
                <a href={item.html_url}>
                  {item.login}
                  {item.avatar_url}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
}