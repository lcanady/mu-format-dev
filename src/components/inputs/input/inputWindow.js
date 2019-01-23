import React, {Component} from 'react'
import Modal from '../../modal/modal'
import InputDialog from '../inputDialog/inputDialog'
import TextBox from '../textbox/textbox'
import { formatApi } from '../../../utilities';

class InputWindow extends Component{
  constructor(props){
    super(props)
    this.state = {
      modalTitle: '',
      modalMessage: '',
      inputText: '',
      outputText: '',
      outputFileName: ''
    }

    this.inputBox = React.createRef()

    this.handleFormat = this.handleFormat.bind(this)
    this.update = this.update.bind(this)
  }



  
  update(options) {
    this.setState(options);
    this.props.updateOutput(options)
  }
  
  async handleFormat() {
    const txt = document.getElementById('inputText').innerText

    const content = await formatApi({txt})
    if(content.documents){
      this.props.updateOutput({
        outputText: content.documents[0].contents
      })
      const openName = document.getElementById('inputBox').value
      const outputFile = content.documents[0].outputFileName
      switch (true){
        case outputFile:
          this.props.updateOutput({outputFileName: outputFile})
          this.setState({outputFileName: outputFile})
          break
        case (!outputFile && openName.length > 0):
          this.props.updateOutput({outputFileName: openName + '.min.txt'})
          this.setState({outputFileName: openName + '.min.txt'})
          break
        default:
          this.props.updateOutput({outputFileName: 'installer.mu.txt'})
          this.setState({outputFileName: 'installer.mu.txt'})
      }

    } else if (content.title) {
      this.setState({
        modalTitle: content.title,
        modalMessage: content.message
      })
      document.getElementById('modal').style.display = 'block'
    }

  }

  render(){
    return (
      <div className='inputs'>
        <div id='inputWrapper'>
          <InputDialog update={this.update} />
          <TextBox contentEditable={true} id={'inputText'}>
            {this.state.inputText}
          </TextBox>  
          <button id='formatButton' onClick={() => this.handleFormat()}>Format</button>
          <Modal 
            title={this.state.modalTitle}
            message={this.state.modalMessage}  
          />

      </div>
      </div>
    )
  }
}

export default InputWindow