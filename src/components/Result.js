import './Result.css'

export default function Result ({ error, isLoading, resultList }) {
  const totalCount = resultList.total_count
  
  if (error) {
    return (
      <div>
        Something went wrong...    
        <br/>
        Error: {error.message}
      </div>
    )
  } if (isLoading) {
    return (
      <div>Loading users...</div> 
    )
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
                <a 
                  href={item.html_url}
                  target='_blank'
                  rel="noreferrer"
                >
                  <div className='user-name'>{item.login}</div>
                  <div className='user-avatar'>
                    <img src={item.avatar_url} alt='user avatar' />
                  </div>
                  <div className='user-starred'>
                    {item.starred_url}
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
}