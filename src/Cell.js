import React, { Component } from 'react';
import Style from './Cell.css';

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
      <td style={cellStyle} className={this.props.status}></td>
    );
  }
}

export default Cell;
