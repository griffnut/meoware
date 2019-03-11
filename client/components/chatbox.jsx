import React from 'react'
// import { remote } from 'electron'
const { BrowserWindow } = require('electron').remote

export default class Chatbox extends React.Component {
  constructor() {
    super()
    this.state = {
      text: '',
      messages: [],
      annoying: null,
      duck: null
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.scrollToBottom = this.scrollToBottom.bind(this)
    this.handleButtons = this.handleButtons.bind(this)
  }
  
  componentDidUpdate() {
    this.scrollToBottom()
  }

  handleChange(evt) {
    this.setState({
      text: evt.target.value,
      annoying: setTimeout(() => this.setState({annoying: null}), 5000)
    })
  }

  handleSubmit(evt) {
    evt.preventDefault()
    const idx = Math.floor((Math.random() * 21))
    const text = {text: this.state.text, user: 'user'}

    const duck = [
      'i luv quackers!!',
      'sry bout meowbot.. he\'s a nut',
      'i dont atualy kno wat ur sayin (•ө•")',
      'i luv walkin around your screen <3',
      'i hope im ur fav ducky!!',
      'ヽ(○･▽･○)ﾉ',
      '(•◇•⑅)',
      'ˏ₍•ɞ•₎ˎ',
      '⊹⋛⋋( ՞ਊ ՞)⋌⋚⊹',
      '<3',
      'hope ur havin good day c:',
      'cheep cheep (☌⌔☌)',
      'ur local rubber ducky is here to cheer u on!!!!',
      'i belive in u (˵ • ਊ • ˵)',
      'hope meowbot isnt annoying >◇<"',
      'meowbot\'s real name is griffin!',
      'meowbot has a habit of never responding..',
      'sry if im repititive..',
      'trying my best!!',
      'ill always b ur frend~',
      'never giv up >:◇'
    ]

    const duckText = {text: duck[idx], user: 'duckbot'}

    this.setState({
      text: '',
      messages: [...this.state.messages, text],
      duck: setTimeout(() => this.setState({ messages: [...this.state.messages, duckText]}), 500)
    })
  }

  handleButtons(evt) {
    const name = evt.target.name

    if (name === 'min') {
      const win = BrowserWindow.getFocusedWindow()
      win.minimize()
    } else if (name === 'close') {
      const win = BrowserWindow.getFocusedWindow()
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
          <button type = 'button' name = 'min' className = 'min' onClick = {this.handleButtons} >-</button>
          <button type='button' name = 'close' className = 'close' onClick = {this.handleButtons} >x</button>
        </div>
        <div id ='message-container'>
          <div className = 'message-duckbot'>
            (☌⌔☌) i wuv u !!!!!
          </div>
          <div className='message-catbot'>
            (ΦωΦ) i'm annoying lol
          </div>
          {this.state.messages.map((message, idx) => (
            <div className = {`message-${message.user}`} key = {idx}>
              {message.text}
            </div>
          ))}
          <div ref = {el => { this.el = el }} />
        </div>
        <div id='bot-is-typing'>
          {
            this.state.annoying
            ? '(ΦωΦ) meowbot is typing...'
            : ''
          }
        </div>
        <form id = 'input-container' onSubmit = {this.handleSubmit}>
          <input type = 'text' value = {this.state.text} onChange = {this.handleChange} />
          <button type = 'submit'>send</button>
        </form>
      </div>
    );
  }
}
