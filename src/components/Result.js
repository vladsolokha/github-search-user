import { useState } from 'react'
import { Octokit } from '@octokit/core'
import './Result.css'

export default function Result ({ isError, error, isLoading, resultList }) {
  const [userResult, setUserResult] = useState([])
  const [itemClicked, setItemClicked] = useState(null)

  
  const handleMoreInfo = async (id, login) => {
    const octokit = new Octokit()
    setItemClicked(itemClicked => itemClicked === id ? 
      null : id)
    const result = await octokit.request("GET /users/{username}", {
      username:  `${login}`
    })
    setUserResult(result.data)
    }
  
  if (isError) {
    return (
      <div>
        Something went wrong...    
        <br/>
        Error: {error.message}
      </div>
    )
  } 
  
  if (isLoading) {
    return (
      <div>Loading users...</div> 
    )
  } else {
    return (
      <div className='user-containers'>
        <ul>
          {/* Map through resultList array */}
          {resultList.items?.map(item => (
            <li className='card' key={item.id}>
              <a 
                href={item.html_url}
                target='_blank'
                rel="noreferrer"
              >
                <div className='user-name'>{item.login}</div>
                <div className='user-avatar'>
                  <img src={item.avatar_url} alt='user avatar' />
                </div>
              </a>

              <button 
                className='user-more-info-button'
                onClick={() => {
                  handleMoreInfo(item.id, item.login)}}
              >
                More info
              </button>

              {itemClicked === item.id &&
                <div className='user-more-info-section'>
                  Followers: {userResult.followers}<br/>
                  Public repos: {userResult.public_repos}<br/>
                  {(userResult.bio !== null) ? (
                    <div className='bio'>
                      Bio: {userResult.bio}<br/>
                    </div>
                    ) : (
                      <div className='bio'>
                      Bio: No Bio description<br/>
                    </div>
                    )
                  }
                </div>
              }
            </li>
          ))}
        </ul>
      </div>
    )
  }
}
