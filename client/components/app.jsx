import React from 'react';

export default class App extends React.Component {
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

  scrollToBottom() {
    this.el.scrollIntoView(false)
  }
  
  render() {
    return (
      <div id = 'chatbox-container'>
        <div id ='message-container'>
          <div className = 'message-catbot'>
            hello, world!
          </div>
          <div className='message-duckbot'>
            hello, world!
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
