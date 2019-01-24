import React, {Component} from 'react'
import './modal.css'



class Modal extends Component{
  constructor(props){
    super(props)

    this.modalStyle={
      display: 'none',
      position: 'fixed',
      zIndex: '10',
      left: '0',
      top: '0',
      width: '100%',
      height: '100%',
      overflow: 'none',
      backgroundColor: 'rgba(0,0,0,0.4)'
    }

  }

  componentDidMount(){
    if (this.props.visible) {
      this.modalBlock.style.display='block'
    }

    document.addEventListener('mousedown', this.handleClick, false)
  }

  componentWillUnmount(){
    document.removeEventListener('mousedown', this.handleClick, false)
  }

  handleClick = (e) => {
    if (this.modalBody.contains(e.target)) {
      return
    }

    this.modalBlock.style.display = 'none'

  }

  render() {
    return (
      <div 
        ref={modalBlock => this.modalBlock = modalBlock} 
        style={this.modalStyle}
        id={this.props.id}
      >
        <div className='modalContent' style={this.props.style} >
          
          <div className='modalBody' ref={body => this.modalBody = body}>
            {
              this.props.title && 
              <div className='modalHead'>
                <h1>{this.props.title}</h1>
                <i className="fas fa-exclamation-circle attn"></i>
              </div> 
              
            }

            {this.props.children}
          </div>

        </div>
      </div>
    )
  }

}


export default Modal