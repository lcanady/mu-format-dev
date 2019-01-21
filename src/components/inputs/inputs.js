import React, {Component} from 'react'
import Inputwindow from './input/inputWindow'
import Outputwindow from './output/outputWindow'

class Inputs extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inputType:'',
      inputFile:'',
      inputText:'',
      outputText:'',
      outputFileName: ''
    }
    this._updateState = this._updateState.bind(this)
  }

  _updateState(obj) {
    this.setState(obj)
  }
  

  render() {
    return(
      <div className='inputs'>
        <Inputwindow  
          update={this._updateState}
        />
        <Outputwindow 
          output={this.state.outputText}
          outFile={this.state.outputFileName}
        />
      </div>
    )
  }
}

export default Inputs