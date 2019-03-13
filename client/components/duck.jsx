import React from 'react'
import * as Mousetrap from 'mousetrap'
import { remote } from 'electron'
const { Menu, MenuItem, BrowserWindow } = remote

export default class Duck extends React.Component {
  constructor() {
    super()
    this.state = {
      ducky: 'lducky'
    }

    this.contextMenu = this.contextMenu.bind(this)
  }

  componentDidMount() {
    const duckWindow = remote.getCurrentWindow()
    Mousetrap.bind('q', () => {
      const audio = document.createElement('audio');
      audio.src = 'http://www.wavlist.com/soundfx/011/duck-baby.wav';
      audio.load();
      audio.play();
    })

    Mousetrap.bind('w', () => {
      this.setState({ducky: 'bducky-walk'})
      const coord = duckWindow.getPosition()
      const x = coord[0]
      const y = coord[1] - 10

      duckWindow.setPosition(x, y)
    })
    Mousetrap.bind('w', () => this.setState({ducky: 'bducky'}), 'keyup')

    Mousetrap.bind('a', () => {
      this.setState({ ducky: 'lducky-walk' })
      const coord = duckWindow.getPosition()
      const x = coord[0] - 10
      const y = coord[1]

      duckWindow.setPosition(x, y)
    })
    Mousetrap.bind('a', () => this.setState({ ducky: 'lducky' }), 'keyup')

    Mousetrap.bind('s', () => {
      this.setState({ ducky: 'fducky-walk' })
      const coord = duckWindow.getPosition()
      const x = coord[0]
      const y = coord[1] + 10

      duckWindow.setPosition(x, y)
    })
    Mousetrap.bind('s', () => this.setState({ ducky: 'fducky' }), 'keyup')

    Mousetrap.bind('d', () => {
      this.setState({ ducky: 'rducky-walk' })
      const coord = duckWindow.getPosition()
      const x = coord[0] + 10
      const y = coord[1]

      duckWindow.setPosition(x, y)
    })
    Mousetrap.bind('d', () => this.setState({ ducky: 'rducky' }), 'keyup')

    Mousetrap.bind('q', () => {
      const audio = document.createElement('audio');
      audio.src = 'http://www.wavlist.com/soundfx/011/duck-baby.wav';
      audio.load();
      audio.play();
    })

    Mousetrap.bind('up', () => {
      this.setState({ ducky: 'bducky-walk' })
      const coord = duckWindow.getPosition()
      const x = coord[0]
      const y = coord[1] - 10

      duckWindow.setPosition(x, y)
    })
    Mousetrap.bind('up', () => this.setState({ ducky: 'bducky' }), 'keyup')

    Mousetrap.bind('left', () => {
      this.setState({ ducky: 'lducky-walk' })
      const coord = duckWindow.getPosition()
      const x = coord[0] - 10
      const y = coord[1]

      duckWindow.setPosition(x, y)
    })
    Mousetrap.bind('left', () => this.setState({ ducky: 'lducky' }), 'keyup')

    Mousetrap.bind('down', () => {
      this.setState({ ducky: 'fducky-walk' })
      const coord = duckWindow.getPosition()
      const x = coord[0]
      const y = coord[1] + 10

      duckWindow.setPosition(x, y)
    })
    Mousetrap.bind('down', () => this.setState({ ducky: 'fducky' }), 'keyup')

    Mousetrap.bind('right', () => {
      this.setState({ ducky: 'rducky-walk' })
      const coord = duckWindow.getPosition()
      const x = coord[0] + 10
      const y = coord[1]

      duckWindow.setPosition(x, y)
    })
    Mousetrap.bind('right', () => this.setState({ ducky: 'rducky' }), 'keyup')
  }

  componentWillUnmount() {
    Mousetrap.unbind('q')
    Mousetrap.unbind('up')
    Mousetrap.unbind('up', 'keyup')
    Mousetrap.unbind('left')
    Mousetrap.unbind('left', 'keyup')
    Mousetrap.unbind('down')
    Mousetrap.unbind('down', 'keyup')
    Mousetrap.unbind('right')
    Mousetrap.unbind('right', 'keyup')
    Mousetrap.unbind('w')
    Mousetrap.unbind('w', 'keyup')
    Mousetrap.unbind('a')
    Mousetrap.unbind('a', 'keyup')
    Mousetrap.unbind('s')
    Mousetrap.unbind('s', 'keyup')
    Mousetrap.unbind('d')
    Mousetrap.unbind('d', 'keyup')
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
      <div id = {this.state.ducky} onContextMenu = {this.contextMenu} />
    )
  }
}