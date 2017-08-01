import React, { Component } from 'react';
import './Cell.css';

class Cell extends Component {
  constructor (props) {
    super(props)
    this.state={
      width: 5,
      height: 5
    }
  }
  render() {
    return (
      <td className={this.props.status} data-col={this.props.col} data-row={this.props.row} onMouseDown={this.props.updateGrid} ></td>
    );
  }
}

export default Cell;
