import React from 'react'
import * as Mousetrap from 'mousetrap'
import { remote } from 'electron'

export default class Duck extends React.Component {
  constructor() {
    super()
    this.state = {
      ducky: 'lducky'
    }
  }

  componentDidMount() {
    const duckWindow = remote.getCurrentWindow()
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
  }

  render() {
    return (
      <div id = {this.state.ducky} onContextMenu = {this.contextMenu} />
    )
  }
}