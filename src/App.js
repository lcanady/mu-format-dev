import React from 'react'
import {NavLink, Route, Switch} from 'react-router-dom'
import './reset.css'
import './App.css';
import Nav from './components/navigation/navigation'
import Inputs from './components/inputs/inputs'
import Markdown from './components/markdown/markdown'

const App = (props) => (
  <div className="App">
    <Nav />
    <div id='wrapper'>
      <Links />
      <Main />
    </div>
  </div>
)


const Links = () => (
  <nav id='links'>
    <ul>
      <li><NavLink to='/'>Home</NavLink></li>
      <li><NavLink to='/how'>How It Works</NavLink></li>
      <li><NavLink to='/contributing'>Contributing</NavLink></li>
      <li><NavLink to='/projects'>Other Projects</NavLink></li>
    </ul>
  </nav>
)

const Main = () => (
  <Switch>
    <Route exact path='/' component={Inputs}></Route>
    <Route exact path='/how' component={How}></Route>
  </Switch>
)

const How = () => (
  <Markdown src='howItWorks.md'/>
)

export default App