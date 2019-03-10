import React from 'react';
import path from 'path'
import { remote } from 'electron'
const { Menu, MenuItem } = remote
var windowManager = remote.require('electron-window-manager')

export default class Cat extends React.Component {
  constructor() {
    super()
    this.state = {
      cat: 'cat-duck'
    }

    this.contextMenu = this.contextMenu.bind(this)
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

  render() {
    return (
      <div id='cat' onContextMenu = {this.contextMenu} />
    )
  }
}