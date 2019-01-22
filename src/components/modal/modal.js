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
      <div id='modal' onClick={this.close}>
        <div className='modalContent'>
          <div className='modalHead'>
            <h1>{this.props.title || 'Error Message!'}</h1>
            <i className="fas fa-exclamation-circle"></i>
          </div>
          <div className='modalBody'>
            <div className='message'>
              <p>{this.props.message || 'Uh oh! Something went wrong.'}</p>
            </div>
            <button className='button' onClick={this.close}>{this.props.button || 'Dismiss'}</button>
          </div>
        </div>
      </div>
    )
  }

}


export default Modal