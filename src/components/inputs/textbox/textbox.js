import React from 'react'
import './textbox.css'

const TextBox = (props) => (
  <div 
    id={props.id}
    className = 'textBox'
    contentEditable = {props.contentEditable}  
    style={{whiteSpace:'pre-wrap'}}
  >{props.children}</div>
)

export default TextBox