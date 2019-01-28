import React, {Component} from 'react'
import './textbox.css'

class TextBox extends Component {

  componentDidMount(){
    this.text.addEventListener('paste', (e) => {
      // cancel paste
      e.preventDefault();

      // get text representation of clipboard
      var text = (e.originalEvent || e).clipboardData.getData('text/plain');

      // insert text manually
      document.execCommand("insertHTML", false, text);
    })
  }

  render() {
    return <div
      suppressContentEditableWarning={true}
      id={this.props.id}
      ref={text => this.text=text}
      className = 'textBox'
      contentEditable = {this.props.contentEditable}  
      style={{whiteSpace:'pre-wrap'}}
    >{this.props.children}</div> 
  }

}

export default TextBox