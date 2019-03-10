import React from 'react'
import { remote } from 'electron'

export default class Chatbox extends React.Component {
  constructor() {
    super()
    this.state = {
      text: '',
      messages: []
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.scrollToBottom = this.scrollToBottom.bind(this)
  }
  
  componentDidUpdate() {
    this.scrollToBottom()
  }

  handleChange(evt) {
    this.setState({text: evt.target.value})
  }

  handleSubmit(evt) {
    evt.preventDefault()

    this.setState({
      text: '',
      messages: [...this.state.messages, this.state.text]
    })
  }

  handleButtons(name) {
    if (name === 'min') {
      const win = remote.getFocusedWindow()
      win.minimize()
    } else if (name === 'close') {
      const win = remote.getFocusedWindow()
      win.close()
    }
  }

  scrollToBottom() {
    this.el.scrollIntoView(false)
  }
  
  render() {
    return (
      <div id = 'chatbox-container'>
        <div id = 'title-bar'>
          <button type = 'button' className = 'min'>-</button>
          <button type='button' className = 'close'>x</button>
        </div>
        <div id ='message-container'>
          <div className = 'message-duckbot'>
            (☌⌔☌) i wuv u !!!!!
          </div>
          <div className='message-catbot'>
            (ΦωΦ) enjoy talking to yourself lol
          </div>
          <div className='message-duckbot'>
            (•́⌔•̀) we iz sry
          </div>
          {this.state.messages.map((message, idx) => (
            <div className = 'message-user' key = {idx}>
              {message}
            </div>
          ))}
          <div ref = {el => { this.el = el }} />
        </div>
        
        <form id = 'input-container' onSubmit = {this.handleSubmit}>
          <input type = 'text' value = {this.state.text} onChange = {this.handleChange} />
          <button type = 'submit'>send</button>
        </form>
      </div>
    );
  }
}
