import React, {Component} from 'react'
import ReactMarkdown from 'react-markdown'
import './markdown.css'

class Markdown extends Component {
  constructor(props){
    super(props)
    this.state={file: ''}
  }

  componentDidMount() {
    if (this.props.src) {
      (async () => {
        const rawResponse = await fetch('http://localhost:3001', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({file:this.props.src})
        });
          const content = await rawResponse.json()
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