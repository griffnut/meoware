import React from 'react';
import Messages from './messages'

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      text: ''
    }

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(evt) {
    this.setState({text: evt.target.value})
  }
  
  render() {
    return (
      <div id = 'chatbox-container'>
        <Messages />
        <div id = 'input-container'>
          <input type='text' value={this.state.text} onChange={this.handleChange} />
          <button type='submit'>send</button>
        </div>
      </div>
    );
  }
}
