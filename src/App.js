import React from 'react'
import './reset.css'
import './App.css';
import Navigation, {Links} from './components/navigation/navigation'
import Inputs from './components/inputs/inputs'

const App = () => (
  <div className="App">
    <Navigation />
    <div id='wrapper'>
      <Links />
      <Inputs />
    </div>
  </div>
)


export default App