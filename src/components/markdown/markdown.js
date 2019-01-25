import React, {Component} from 'react'
import ReactMarkdown from 'react-markdown'
import './markdown.css'
import {formatApi} from '../../utilities'

class Markdown extends Component {
  constructor(props){
    super(props)
    this.state={file: ''}
  }

  componentDidMount() {
    if (this.props.src) {
      (async () => {
          const content = await formatApi({file:this.props.src})
          this.setState({file:content.file}) 
      })()
      .catch(error => alert(error))   
    }
  }

  render() {
    return (
      <div className='markdownContainer'>
        <ReactMarkdown source={this.state.file} />
      </div>
    )
  }

}

export default Markdown