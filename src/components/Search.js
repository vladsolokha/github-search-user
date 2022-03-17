import React from 'react'

export default function Search ({ searchText, onSetSearchTextChange }) {
    return (
        <div className='search-container'>
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
                name='search-button'
                type='submit'
            >Search
            </button>


        </div>
    )
}