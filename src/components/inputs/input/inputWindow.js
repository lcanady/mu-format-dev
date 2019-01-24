import React, {Component} from 'react'
import Modal from '../../modal/modal'
import InputDialog from '../inputDialog/inputDialog'
import TextBox from '../textbox/textbox'
import { formatApi } from '../../../utilities';
import './inputWindow.css'


const introText = `
/*
=== Welcome! ================================================================

Welcome to Mu-Format, the library that turns pretty formatted MU code into
something you can quote into your client.

This is a quick demo to show how it works, and to get some in-the-wild
use cases.

Hit the 'Format' button below to see how the formatter handles our example
code, or hit 'Clear' and write your own.

You can also load a file from your system, or a pre-existing MU-Formatter
code archive from gitHub.  ex. https://github.com/lcanady/archive-test
Be gentle using the github feature until I code oAuth for Github. Right now
my IP is restricted to 60 API calls an hour.  When you log in it increases
to 5000, so yeah. :)

Enjoy and let me know what you think!

- Lem (kumakun on MSB)

=============================================================================
*/

@ExitFormat [v( d.grp )]=
    [u( .header, Exits )]%r
    [columns(
        iter( %0,
            switch( 1,

// Find exits with the &secondary attribute

                issecondary( ## ),
                    edit(
                        name( ## ),
                        <, ansi( v( config.secondary ), < ),
                        >, ansi( v( config.secondary ), > )
                    ),

// Find exits with the &tertiary attribute

                istertiary( ## ),
                    edit(
                        name( ## ),
                        <, ansi( v( config.tertiary ), < ),
                        >, ansi( v( config.tertiary ), > )
                    ),
                edit(
                    name( ## ),
                    <, ansi( v( config.hcolor ), < ),
                    >, ansi( v( config.hcolor ), > )
                )
            ),,|
        )
        ,26,|
    )]
    [if(

// IC Area?

        not( hasflag( %!, IC )),
        footer( OOC AREA ),
        footer()
    )]

-

`.trim()


class InputWindow extends Component{
  constructor(props){
    super(props)
    this.state = {
      modalTitle: '',
      modalMessage: '',
      inputText: introText,
      outputText: '',
      outputFileName: ''
    }

    this.handleFormat = this.handleFormat.bind(this)
    this.update = this.update.bind(this)
  }


  
  update(options) {
    this.setState(options);
    this.props.updateOutput(options)
  }
  
  async handleFormat() {
    const txt = document.getElementById('inputText').innerText

    const content = await formatApi({txt})
    if(content.documents){
      this.props.updateOutput({
        outputText: content.documents[0].contents
      })
      const openName = document.getElementById('inputBox').value
      const outputFile = content.documents[0].outputFileName
      switch (true){
        case outputFile:
          this.props.updateOutput({outputFileName: outputFile})
          this.setState({outputFileName: outputFile})
          break
        case (!outputFile && openName.length > 0):
          document.getElementById('outputBox').value = openName + '.min.txt'
          this.props.updateOutput({outputFileName: openName + '.min.txt'})
          this.setState({outputFileName: openName + '.min.txt'})
          break
        default:
          document.getElementById('outputBox').value = 'installer.mu.txt'
          this.props.updateOutput({outputFileName: 'installer.mu.txt'})
          this.setState({outputFileName: 'installer.mu.txt'})
      }

    } else if (content.title) {
      this.setState({
        modalTitle: content.title,
        modalMessage: content.message
      })
      document.getElementById('errorModal').style.display = 'block'
    }

  }

  clear = () => {
    this.props.updateOutput({
      outputFileName: '',
      outputText:''
    })

    this.setState({
      outputFileName: '',
      outputText: '',
      inputText: ''
    })

    document.getElementById('inputBox').value = ''
    document.getElementById('outputBox').value = ''
    
  }

  render(){
    return (
      <div id='inputWrapper'>
        <InputDialog update={this.update} />
        <TextBox contentEditable={true} id={'inputText'}>
          {this.state.inputText}
        </TextBox>
        <div className={'inputButtons'}>
          <button 
            id={'formatButton'} 
            onClick={this.handleFormat} 
            style={{width:'250px'}}
          >
            Format
          </button>
          <button 
            id={'clearButton'} 
            onClick={this.clear}
            style={{width:'250px'}}
          >
            Clear
          </button>
        </div>  
        
        <Modal title={this.state.modalTitle} id={'errorModal'}>
          {this.state.modalMessage}
        </Modal>  

    </div>
      
    )
  }
}

export default InputWindow