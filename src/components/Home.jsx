import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className='main'>
        <h2>Welcome to the word of 3D </h2>
       <Link to = "/three"><button className='button-to-enter'>Click here to experience</button></Link> 
    </div>
  )
}

export default Home