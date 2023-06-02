import React from 'react'
import { Link } from 'react-router-dom'
import Three from '../threeD/Three'

function Home() {
  return (<>
  
  <div className='main'>
  <Three path={{modelPath:"street_exterior_dead_end"}}/>
  <div className='content'>
  <h2>Welcome to the word of 3D </h2>
       <Link to = "/three"><button  className='button-to-enter'>Click here to experience</button></Link> 

  </div>
    
      
    </div>
  </>
    
  )
}

export default Home