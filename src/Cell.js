import React, { Component } from 'react';
import './Cell.css';

class Cell extends Component {
  constructor (props) {
    super(props)
    this.state={
      width: 30,
      height: 30
    }
  }
  render() {
    let cellStyle = {
      height: this.state.height+"px", 
      width: this.state.width+"px",
      border: '1px solid #000',
    }
    return (
      <td style={cellStyle} className={this.props.status} data-col={this.props.col} data-row={this.props.row} onClick={this.props.updateGrid} ></td>
    );
  }
}

export default Cell;
