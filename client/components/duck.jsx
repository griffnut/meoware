import React from 'react'
import * as Mousetrap from 'mousetrap'
import { remote } from 'electron'
const { Menu, MenuItem, BrowserWindow } = remote

export default class Duck extends React.Component {
  constructor() {
    super()
    this.state = {
      ducky: ''
    }

    this.contextMenu = this.contextMenu.bind(this)
    this.move = this.move.bind(this)
    this.stop = this.stop.bind(this)
  }

  componentDidMount() {
    Mousetrap.bind('q', () => {
      const audio = document.createElement('audio');
      audio.src = 'http://www.wavlist.com/soundfx/011/duck-baby.wav';
      audio.load();
      audio.play();
    })

    Mousetrap.bind(['up', 'w'], () => this.move(0, -10, 'bducky'), 'keydown')
    Mousetrap.bind(['up', 'w'], () => this.stop('bducky'), 'keyup')

    Mousetrap.bind(['left', 'a'], () => this.move(-10, 0, 'lducky'), 'keydown')
    Mousetrap.bind(['left', 'a'], () => this.stop('lducky'), 'keyup')

    Mousetrap.bind(['down', 's'], () => this.move(0, 10, 'fducky'), 'keydown')
    Mousetrap.bind(['down', 's'], () => this.stop('fducky'), 'keyup')

    Mousetrap.bind(['right', 'd'], () => this.move(10, 0, 'rducky'), 'keydown')
    Mousetrap.bind(['right', 'd'], () => this.stop('rducky'), 'keyup')
  }

  move(moveX, moveY, dir) {
    const duckWindow = remote.getCurrentWindow()
    const ducky = document.getElementById('ducky')
    
    ducky.style.background = `url('./images/${dir}.gif') no-repeat`
    this.setState({ ducky: dir })
    const coord = duckWindow.getPosition()
    const x = coord[0] + moveX
    const y = coord[1] + moveY

    duckWindow.setPosition(x, y)
  }

  stop(dir) {
    const ducky = document.getElementById('ducky')
    
    if (this.state.ducky === `${dir}`) {
      ducky.style.background = `url('./images/${dir}.png') no-repeat`
    }
  }

  contextMenu(e) {
    e.preventDefault()
    const menu = new Menu()
    const win = BrowserWindow.getFocusedWindow()

    menu.append(new MenuItem({
      label: 'bye~',
      click() {
        win.close()
      }
    }))

    menu.popup()
  }

  render() {
    return (
      <div id = 'ducky' onContextMenu = {this.contextMenu} />
    )
  }
}