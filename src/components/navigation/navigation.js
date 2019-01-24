import React from 'react'
import logo from './settings-work-tool.svg';
import github from './github-icon.svg'
import './navigation.css'
import Modal from '../modal/modal'
import Markdown from '../markdown/markdown'

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

const styles = {
  width: '70%',
  height: '100%',
  display: 'block',
  overflowY: 'auto'
}

const showModal = (modal) => {
  document.getElementById(modal).style.display = 'block'
}


const Links = () => (
  <nav id='links'>
    <ul>
      <li onClick={() => showModal('howItWorks')}>How It Works</li>
      <li>Contributing</li>
      <li>Other Projects</li>
    </ul>
    <Modal style={styles} id={'howItWorks'}>
      <Markdown src={'howItWorks.md'} />
    </Modal>
  </nav>
)
export {Links}
export default Navigation