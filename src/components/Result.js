import './Result.css'

export default function Result ({ error, isLoading, resultList }) {

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
          {/* Total Results: {resultList.total_count} */}
        </div>
{/*                 
        <div className='user containers'>
          <ul>
            {resultList.items.map(item => (
              <li key={item.id}>
                <a href={item.html_url}>
                  {item.login}
                  {item.avatar_url}
                </a>
              </li>
            ))}
          </ul>
        </div> */}
      </div>
    )
  }
}