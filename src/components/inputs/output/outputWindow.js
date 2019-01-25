import React, {Component} from 'react'
import './outputWindow.css'
import TextBox from '../textbox/textbox'


class OutputWindow extends Component {
  constructor(props){
    super(props)

    this.outputBox = React.createRef()
  }

  saveClickHandler = () => {
    console.log(this.outputBox)
    document.getElementById('save').click()
  } 


  render(){

    const title = document.getElementById('outputBox') ? 
      document.getElementById('outputBox').value : 
      'installer.mu.txt';

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
        <a
            id='save'
            download={title}
            href={"data:text/html," + this.props.output} display={false}></a>
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