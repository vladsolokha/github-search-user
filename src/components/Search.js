import React from 'react'

export default function Search () {
    return (
        <div className='search-container'>
            <input 
                className='search-bar'
                name='search'
                type='search'
                placeholder='search for user'
            />
            <button
                name='search-button'
                type='submit'
            >Search
            </button>


        </div>
    )
}