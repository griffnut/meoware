import React from 'react';
import path from 'path'
import { remote } from 'electron'
const { Menu, MenuItem, BrowserWindow } = remote
var windowManager = remote.require('electron-window-manager')

export default class Cat extends React.Component {
  constructor() {
    super()
    this.state = {
      cat: 'cat',
      canHold: false
    }

    this.contextMenu = this.contextMenu.bind(this)
    this.action = this.action.bind(this)
    this.stopAction = this.stopAction.bind(this)
    this.handleButtons = this.handleButtons.bind(this)
  }

  action() {
    this.setState({cat: 'cat-pet'})
  }

  stopAction() {
    this.setState({
      cat: 'cat'
    })
  }

  contextMenu(e) {
    e.preventDefault()
    const filePath = path.join(__dirname, '../../')
    const duckWindow = {
      'width': 44,
      'height': 42,
      'alwaysOnTop': true,
      'transparent': true,
      'resizable': false,
      'frame': false
    }
    const chatWindow = {
      'width': 200,
      'height': 265,
      'alwaysOnTop': true,
      'transparent': true,
      'resizable': false,
      'frame': false
    }
    const menu = new Menu()

    menu.append(new MenuItem({ 
      label: 'duck', 
      click() { 
        windowManager.createNew('duck', 'duck', `file://${filePath}/public/duck.html`, false, duckWindow, false).open()
      } 
    }))

     menu.append(new MenuItem({ 
       label: 'chat', 
       click() {
         windowManager.createNew('chatbox', 'chatbox', `file://${filePath}/public/chatbox.html`, false, chatWindow, false).open()
       }
    }))

    menu.popup()
  }

  handleButtons(evt) {
    const name = evt.target.name

    if (name === 'min') {
      const win = BrowserWindow.getFocusedWindow()
      win.minimize()
    } else if (name === 'close') {
      const win = BrowserWindow.getFocusedWindow()
      win.close()
    } else if (name === 'carry') {
      this.setState({cat: 'cat-carry', canHold: true})
    } else if (name === 'pet') {
      this.setState({cat: 'cat', canHold: false})
    }
  }

  render() {
    return (
      <div>
        <div id='title-bar'>
        {/* {
          this.state.canHold
          ? <button type='button' name='pet' className='min' onClick={this.handleButtons} >pet</button>
          : <button type='button' name='carry' className='min' onClick={this.handleButtons} >carry</button>
        } */}
          <button type='button' name='min' className='min' onClick={this.handleButtons} >-</button>
          <button type='button' name='close' className='close' onClick={this.handleButtons} >x</button>
        </div>
        <div id={this.state.cat} onContextMenu={this.contextMenu} onMouseDown={this.action} onMouseUp={this.stopAction}>
        </div>
      </div>
    )
  }
}