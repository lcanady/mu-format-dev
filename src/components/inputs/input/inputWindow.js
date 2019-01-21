import React, {Component} from 'react'
import Modal from '../../modal/modal'

class InputWindow extends Component{
  constructor(props){
    super(props)
    this.state = {
      inputDialog: 'https://github.com/',
      inputButton: 'Load',
      modalTitle: '',
      modalMessage: ''
    }

    this.changeFile = this.changeFile.bind(this)
    this.inputButton = this.inputButton.bind(this)
    this.inputChange = this.inputChange.bind(this)
    this.openDialogClick = this.openDialogClick.bind(this)
    this.handleFormat = this.handleFormat.bind(this)


    this.update = props.update
  }


  changeFile(e) {
    let {value} = e.target
    switch (value) {
      case 'github':
        this.setState({inputButton: 'Load'})
        this.update({inputType:'github'})
        document.getElementById('inputBox').innerHTML = 'https://github.com/'
        document.getElementById('inputBox').classList.remove('disabled')
        document.getElementById('inputBox').contentEditable = true;

        break
      default:
        this.setState({inputButton: 'Open'})
        this.update({inputType:'file'})
        document.getElementById('inputBox').innerHTML = ''
        document.getElementById('inputBox').classList.add('disabled')
        document.getElementById('inputBox').contentEditable = false;
       
    }
  }
  
  inputChange(e){
    this.update({inputFile: e.target.innerText}) 

  }

  async inputButton() {
    this.update({outputText:'', outputFileName:''})
    document.getElementById('inputText').innerHTML = ''
    switch (this.state.inputButton) {
      case 'Open':
        document.getElementById('inputBox').innerHTML = ''
        document.getElementById('file').click();
        break
      case 'Load':
      
        const rawUrl = document.getElementById('inputBox').innerHTML
        const match = rawUrl.match(/github.com\/(.*)\/(.*)/)

        if (match) {
          const url = `github:${match[1]}/${match[2]}`
          
          const rawResponse = await fetch('http://localhost:3001', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({url})
          });
          
          const content = await rawResponse.json()
          const inputText = document.getElementById('inputText')
          switch (true) {
            case content.documents:
              this.update({
                inputText: content.documents[0].raw,
                outputText: content.documents[0].contents
              })
              inputText.innerHTML = content.documents[0].raw

              if (match){
                const title = match[1].toLowerCase() + '.txt'
                document.getElementById('outputBox').innerHTML= title
              }

              break
            case content.title:
              this.setState({
                modalTitle:content.title,
                modalMessage:content.message
              })
              document.getElementById('modal').style.display = 'block'
              break
            default:
              this.setState({
                modalTitle:'Uh oh!',
                modalMessage: 'Something went wrong!'
              })
              document.getElementById('modal').style.display = 'block'
          }
        } else {
          this.setState({
            modalTitle: 'Error!',
            modalMessage: 'You must enter a user name and repo.'
          })
          document.getElementById('modal').style.display='block'

        }
    }
  }

  openDialogClick(){
    const selectedFile = document.getElementById('file').files[0];

    const reader = new FileReader();

    reader.onload = function(e) {
      const text = reader.result
      document.getElementById('inputText').innerHTML = text
      const fileName = document.getElementById('file').files[0].name
      document.getElementById('inputBox').innerHTML = fileName
    }

    if (selectedFile) {
      reader.readAsText(selectedFile, 'utf8');
    }

  }

  async handleFormat() {
    const txt = document.getElementById('inputText').innerText
    const rawResponse = await fetch('http://localhost:3001', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({txt})
    });

    const content = await rawResponse.json()
    
    if(content.documents){
      this.update({
        outputText: content.documents[0].contents
      })
      const openName = document.getElementById('inputBox').innerHTML
      const outputFile = content.documents[0].outputFileName
      switch (true){
        case outputFile:
          this.update({outputFileName: outputFile})
          break
        case (!outputFile && openName.length > 0):
          this.update({outputFileName: openName + '.min.txt'} )
          break
        default:
          this.update({outputFileName: 'installer.mu.txt'})
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
      <div id='inputWrapper'>
        <div id='inputDialog'>     
          <div className='greyedInput'>
            <select 
              id='fileType'
              onChange={this.changeFile}
            >
              <option value='github' selected>Github</option>
              <option value='file'>File</option>
            </select>
          </div>
          <div 
            id='inputBox' 
            contentEditable="true"
            onInput={this.inputChange}
          >
            https://github.com/
          </div>
          <input 
            type="file"
            onChange={this.openDialogClick} 
            id="file" 
            ref="fileUploader" 
            style={{display: "none"}}
          />
          <button id='inputButton' onClick={this.inputButton}>{this.state.inputButton}</button>
        </div>
        <div 
          id='inputText' 
          contentEditable = 'true'  
          style={{whiteSpace:'pre-wrap'}}
        ></div>
        <button id='formatButton' onClick={() => this.handleFormat()}>Format</button>
        <Modal 
          title={this.state.modalTitle}
          message={this.state.modalMessage}  
        />
      </div>
    )
  }
}

export default InputWindow