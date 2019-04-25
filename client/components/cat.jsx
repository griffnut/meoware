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
    const cat = document.getElementById('cat')
    cat.style.background = "url('./images/griff-pet.gif') center no-repeat"
  }

  stopAction() {
    const cat = document.getElementById('cat')
    cat.style.background = "url('./images/griff.png') center no-repeat"
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
        windowManager.open('duck', 'duck', `file://${filePath}/public/duck.html`, false, duckWindow, false)
      } 
    }))

     menu.append(new MenuItem({ 
       label: 'chat', 
       click() {
         windowManager.open('chatbox', 'chatbox', `file://${filePath}/public/chatbox.html`, false, chatWindow, false)
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
    } 
  }

  render() {
    return (
      <div>
        <div id='title-bar'>
          <button type = 'button' name = 'min' className = 'min' onClick = {this.handleButtons} >-</button>
          <button type = 'button' name = 'close' className = 'close' onClick = {this.handleButtons} >x</button>
        </div>
        <div id = 'cat' onContextMenu = {this.contextMenu} onMouseDown = {this.action} onMouseUp = {this.stopAction}>
        </div>
      </div>
    )
  }
}