import React, {Component} from 'react'
import save from 'file-saver'
import './outputWindow.css'
import TextBox from '../textbox/textbox'


class OutputWindow extends Component {
  constructor(props){
    super(props)

    this.outputBox = React.createRef()
  }

  saveClickHandler = async () => {
    const outputText = document.getElementById('outputText')
    const outputBox = document.getElementById('outputBox')
    
    var blob = new Blob([outputText.value], {type: "text/plain;charset=utf-8"})
    await save(blob, outputBox.value)
    
  } 


  render(){
    return (
      <div id='outputWrapper'>
        <div id='outputDialog'>     
          <input id='outputBox'></input>
          <button 
            id='saveButton'
            onClick={this.saveClickHandler}
          >
            Save
          </button>
          
          
        </div>
        <TextBox id={'outputText'} contentEditable={false}>{this.props.output}</TextBox>
        <div className='inputButtons'>
          <button id='optionsButton' style={{width:'45%'}} disabled={true}>Options</button>
          <button id='formatButton' style={{width:'45%'}} disabled={true}>Log</button>
        </div>
      </div>
    )
  }
}

export default OutputWindow