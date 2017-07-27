import React, { Component } from 'react';
import Cell from './Cell';

class App extends Component {
  constructor(props) {
    super(props);
    this.state={
      width:10,
      height: 10,
    }
  }
  
  componentDidMount() {
    this.renderGrid();
  }
  
  renderGrid () {
    let rows = [];
    for (let y = 0; y < this.state.height; y ++) {
      let row = [];
      for (let x = 0; x < this.state.width; x ++) {
        row.push(<Cell key={'col'+y+'row'+x} />);
      }
      rows.push(<tr>{row}</tr>);
    }
    this.setState({grid: rows});
  }
  
  render() {
    return (
      <table>
        <tbody>
          <tr>
            {this.state.grid}
          </tr>
        </tbody>
      </table>
    );
  }
}

export default App;
