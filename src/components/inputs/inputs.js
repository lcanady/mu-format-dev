import React, {Component} from 'react'
import Inputwindow from './input/inputWindow'
import Outputwindow from './output/outputWindow'

class Inputs extends Component {
  constructor(props) {
    super(props)
    this.state = {

      outputText:'',
      outputFileName: ''
    }
    this.updateOutput = this.updateOutput.bind(this)
  }

  updateOutput(obj) {
    this.setState(obj)
  }

  render() {
    return(
      <div className='inputs'>
        <Inputwindow  
          updateOutput={this.updateOutput}
        />
        <Outputwindow 
          output={this.state.outputText}
          outFile={this.state.outputFileName}
          updateOutput={this.state.updateOutput}
        />
      </div>
    )
  }
}

export default Inputs