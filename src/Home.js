import React, { useContext } from 'react'
import Feed from "./Feed.js"
import DataContext from './context/DataContext.js'
const Home = () => {
  const { searchResult, fetchError, isLoading} = useContext(DataContext)
  return (
    <main className='Home'>
    {isLoading && <p className='statusMsg'>Loading posts...</p>}
    {!isLoading && fetchError && <p className='statusMsg' style={{color : "red"}}>{fetchError}</p>}
    {!isLoading && !fetchError && (
      searchResult.length ?   <Feed posts={searchResult}/> : 
      <p className='statusMsg'>No posts to display.</p>
    )}

    </main>
  )
}

export default Home