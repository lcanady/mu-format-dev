import React, {Component} from 'react'
import {formatApi} from '../../../utilities'

class InputDialog extends Component {
  constructor (props) {
    super(props)
  }

  changeFile(e) {
    let {value} = e.target
    switch (value) {
      case 'github':
        this.setState({inputButton: 'Load'})

        break
      default:
        this.setState({inputButton: 'Open'})
        this.update({inputType:'file'})
    }
  }
  
  inputChange(e){
    this.update({inputFile: e.target.innerText}) 

  }

  async uploadButton() {
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
          const content = await formatApi({url})
          const inputText = document.getElementById('inputText')
          switch (true) {
            case content.documents && content.documents.length > 0:
              this.update({
                inputText: content.documents[0].raw,
                outputText: content.documents[0].contents
              })
              inputText.innerHTML = content.documents[0].raw

              if (match){
                const title = match[1].toLowerCase() + '.' + match[2].toLowerCase() + '.txt'
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


  render() {
    return (
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
    )
  }

}

export default InputDialog