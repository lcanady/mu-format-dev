import React, {Component} from 'react'
import Modal from '../../modal/modal'
import './loading.css'

const modalStyles = {
  backgroundColor:'#007EEE',
  width:'150px',
  height: '150px',
  margin: '15% auto',
  borderRadius: '3px'
}

class Loading extends Component {
  constructor(){
    super()
  }

  render() {
    return (
      <Modal id={'loading'} style={modalStyles}>
        <div className='loader'></div>
        <p className='loadingText'>Loading...</p>
      </Modal>
    )
  }

}

export default Loading