import React from 'react'
import * as Mousetrap from 'mousetrap';
import { remote } from 'electron'
import localShortcut from 'electron-localshortcut';

export default class Duck extends React.Component {
  constructor() {
    super()
    this.state = {
      ducky: 'lducky'
    }
  }

  componentDidMount() {
    Mousetrap.bind('w', () => this.setState({ducky: 'bducky-walk'}))
    Mousetrap.bind('w', () => this.setState({ducky: 'bducky'}), 'keyup')

    Mousetrap.bind('a', () => this.setState({ ducky: 'lducky-walk' }))
    Mousetrap.bind('a', () => this.setState({ ducky: 'lducky' }), 'keyup')

    Mousetrap.bind('s', () => this.setState({ ducky: 'fducky-walk' }))
    Mousetrap.bind('s', () => this.setState({ ducky: 'fducky' }), 'keyup')

    Mousetrap.bind('d', () => this.setState({ ducky: 'rducky-walk' }))
    Mousetrap.bind('d', () => this.setState({ ducky: 'rducky' }), 'keyup')
  }

  render() {
    return (
      <div id = {this.state.ducky} onContextMenu = {this.contextMenu} />
    )
  }
}

const duckWindow = remote.getCurrentWindow()

localShortcut.register(duckWindow, 'W', () => {
  const coord = duckWindow.getPosition()
  const x = coord[0]
  const y = coord[1] - 10

  duckWindow.setPosition(x, y)
})

localShortcut.register(duckWindow, 'A', () => {
  const coord = duckWindow.getPosition()
  const x = coord[0] - 10
  const y = coord[1]

  duckWindow.setPosition(x, y)
})

localShortcut.register(duckWindow, 'S', () => {
  const coord = duckWindow.getPosition()
  const x = coord[0]
  const y = coord[1] + 10

  duckWindow.setPosition(x, y)
})

localShortcut.register(duckWindow, 'D', () => {
  const coord = duckWindow.getPosition()
  const x = coord[0] + 10
  const y = coord[1]

  duckWindow.setPosition(x, y)
})