import React from 'react'
import './AnimatedText.css'

function AnimatedText() {
  return (
    <div className='animated-text'>
    <div>
    <h1>Elevate your productivity <br /> game.</h1>
    <p>Taskly helps to - <span id="spin"></span></p>
    </div>
    </div>
  )
}

export default AnimatedText