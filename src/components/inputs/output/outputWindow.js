import React, {Component} from 'react'

const outputWindow = (props) => {
  


  return (
    <div id='outputWrapper'>
      <div id='outputDialog'>     
        <div id='outputBox' contentEditable = 'true'>{props.outFile}</div>
        <button id='saveButton'>Save</button>
      </div>
      <div id='outputText' style={{whiteSpace:'pre-wrap'}}>{props.output}</div>
      <button id='formatButton'>Log</button>
    </div>
  )


}

export default outputWindow