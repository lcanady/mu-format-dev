import React, {Component} from 'react'



class Modal extends Component{
  constructor(props){
    super(props)

    this.close = this.close.bind(this)
  }

  close() {
    document.getElementById('modal').style.display = 'none'
  }

  render() {
    return (
      <div id='modal'>
        <div className='modalContent'>
          <div className='message'>
            <h1>{this.props.title}</h1>
            <p>{this.props.message}</p>
          </div>
          <span className='close' onClick={this.close}>&times;</span>
        </div>
      </div>
    )
  }

}


export default Modal