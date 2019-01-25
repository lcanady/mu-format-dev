import React, {Component} from 'react'
import Modal from '../modal/modal'


const modalStyles = {
  margin: '12% 35%',
  borderRadius: '3px'
}

const bodyStyles = {
  padding: '30px'
}

class ErrorModal extends Component{
  constructor(props) {
    super(props)

  }

  clickHandler = () => {
    document.getElementById(this.props.id).style.display='none'
  }

  render() {
    return (
      <Modal id={this.props.id} style={modalStyles}>
        <div className='modalHead'>
          <h1>{this.props.title}</h1>
          <i className="fas fa-exclamation-circle attn"></i>
        </div> 
        <div className='modalBody' style={bodyStyles}>
          {this.props.children}
        </div>
        <button 
            onClick={this.clickHandler} 
            style={{margin: '0 30px 20px 30px'}}
          >
            Close
          </button>
      </Modal>
    )
  }

}

export default ErrorModal