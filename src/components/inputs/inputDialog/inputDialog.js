import React, {Component} from 'react'
import {formatApi} from '../../../utilities'
import ErrorModal from '../../modal/errormodal'
import './inputDialog.css'

class InputDialog extends Component {
  constructor (props) {
    super(props)
    this.state = {
      inputButton:'Open',
      modalTitle: '',
      modalMessage: ''
    }

    this.changeFile = this.changeFile.bind(this)
    this.uploadButton = this.uploadButton.bind(this)
    
    this.openDialogClick = this.openDialogClick.bind(this)

  }

  componentDidMount(){
    document.getElementById('inputButton').disabled = true;
  }

  changeFile(e) {
    const inputBox = document.getElementById('inputBox')
    const inputButton = document.getElementById('inputButton')
    const inputType = document.getElementById('inputType')
    let {value} = e.target
    switch (value) {
      case 'github':
        this.setState({inputButton: 'Load'})
        inputType.classList.remove('greyedInput')
        inputButton.disabled = false;
        inputBox.value = 'https://github.com/'
        inputBox.disabled = false;
        break
      case 'file':
        inputButton.disabled = false;
        inputType.classList.remove('greyedInput')
        this.setState({inputButton: 'Open'})
        inputBox.value = ''
        inputBox.disabled = true;
        break
      default:
        inputButton.disabled = true;
        inputType.classList.add('greyedInput')
        this.setState({inputButton: 'Open'})
        inputBox.value = ''
        inputBox.disabled = false;
    }
  }
  
  /** Handler for when 'load'/'open' button is clicked. */
  async uploadButton() {
    const inputBox = document.getElementById('inputBox')
    this.props.update({inputText:''})
    
    switch (this.state.inputButton) {
      
      // If 'file' is selected, trigger the open file dialog box.
      case 'Open':
        inputBox.value = ''
        document.getElementById('file').click();
        break

      // If Github is selected, grab the archive and process.
      case 'Load':

        // Make sure the url is valid 
        const match = inputBox.value.match(/github.com\/(.*)\/(.*)/)

        if (match) {
          const url = `github:${match[1]}/${match[2]}`
          
          // Call the Mu-Format API.
          document.getElementById('loading').style.display='block' 
          const content = await formatApi({url})
          document.getElementById('loading').style.display='none'

          switch (true) {
            // If content has documents and it's total length of entries is
            // more than zero as well.
            case content.documents && content.documents.length > 0:
              // update parent state.
              this.props.update({
                inputText: content.documents[0].raw,
                outputText: content.documents[0].contents
              })
              
              // Update the title.
              const title = match[1].toLowerCase() + '.' + match[2].toLowerCase() + '.txt'
              document.getElementById('outputBox').value= title

              break
            // A Message was sent in place of a document.
            case content.title:
              this.setState({
                modalTitle:content.title,
                modalMessage:content.message
              })
              document.getElementById('apiModal').style.display = 'block'
              break
            default:
              this.setState({
                modalTitle:'Uh oh!',
                modalMessage: 'Something went wrong while talking to the API!'
              })
              document.getElementById('apiModal').style.display = 'block'
          }
        } else {
          this.setState({
            modalTitle: 'Error!',
            modalMessage: 'You must enter a user name and repo.'
          })
          document.getElementById('apiModal').style.display='block'

        }
        
    }
  }

  openDialogClick(){
    const selectedFile = document.getElementById('file').files[0];

    // Create a new instance of the file reader
    const reader = new FileReader();

    // Once the file is read...
    reader.onload = (e) => {

      const text = reader.result
      // Update parent state.
      this.props.update({inputText:text})
      document.getElementById('inputBox').value = selectedFile.name
    }

    if (selectedFile) {
      reader.readAsText(selectedFile, 'utf8');
    }

  }

  render() {
    return (
      <div id='inputDialog'>     
          <div id ='inputType' className='blueInput greyedInput'>
            <select id='fileType' onChange={this.changeFile}>
              <option value ='' defaultValue >Upload Method</option>
              <option value='github'>Github</option>
              <option value='file'>File</option>
            </select>
          </div>
          <input 
            id='inputBox' 
            onInput={this.inputChange}
          >
          </input>
          <input 
            type="file"
            onChange={this.openDialogClick} 
            id="file" 
            ref="fileUploader" 
            style={{display: "none"}}
          />
          <button 
            id='inputButton' 
            onClick={this.uploadButton}
          >
            {this.state.inputButton}
          </button>
          <ErrorModal title={this.state.modalTitle} id={'apiModal'}>
            {this.state.modalMessage}
          </ErrorModal>
        </div>
    )
  }

}

export default InputDialog