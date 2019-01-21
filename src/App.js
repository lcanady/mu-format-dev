import React, { Component } from 'react';
import './reset.css'
import './App.css';
import Nav from './components/navigation/navigation'
import Inputs from './components/inputs/inputs'

class App extends Component {

  render() {
    return (
      <div className="App">
        <Nav />
        <div id='wrapper'>
          <div id='links'>
            <ul>
              <li><a href='#'>How It Works</a></li>
              <li><a href='#'>Contributing</a></li>
              <li><a href='#'>Other Projects</a></li>
            </ul>
          </div>
          <Inputs />

        </div>
      </div>
    );
  }
}

export default App;
