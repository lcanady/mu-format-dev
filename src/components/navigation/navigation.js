import React from 'react'
import logo from './settings-work-tool.svg';
import github from './github-icon.svg'

const Navigation = () => {
  return (
    <nav id='mast'>
      <div className='nav-container'>
        <img src={logo} className='logo' alt='logo' />
        <p>
          <span className='logo-text'>Mu-Format </span> 
          A JavaScript Library for converting MUSHCode into something quotable.
        </p>
        <a href={'https://github.com/lcanady/mu-format'}>
          <img src={github} className='github' alt='Github' />
        </a>
      </div>
    </nav>
  )
}

export default Navigation