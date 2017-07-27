import React, { Component } from 'react';
import Cell from './Cell';

class App extends Component {
  constructor(props) {
    super(props);
    this.state={
      width:10,
      height: 10,
      gridStatus: []
    }
  }
  
  componentDidMount() {
    this.startGame();
  }
  /*
  * Generate random life status matrix and renders grid
  */
  startGame () { 
    let rows = [];
    for (let y = 0; y < this.state.height; y ++) {
      let row = [];
      for (let x = 0; x < this.state.width; x ++) {
        let rand = Math.random();
        row.push((rand < 0.6)? "alive" : "dead");
      }
      rows.push(row);
    }
    this.setState({gridStatus: rows});
  }
  
  componentDidUpdate(prevProps,prevState) {
    if (prevState.gridStatus !== this.state.gridStatus) {
      this.renderGrid();
    }
  }
  
  renderGrid () {
    let rows = [];
    for (let y = 0; y < this.state.height; y ++) {
      let row = [];
      for (let x = 0; x < this.state.width; x ++) {
        row.push(
          <Cell key={'col'+y+'row'+x} 
          status = { Array.from(this.state.gridStatus)[y][x] }
           />);
      }
      rows.push(<tr key={'col'+y}>{row}</tr>);
    }
    this.setState({grid: rows});
  }
  
  render() {
    return (
      <table>
        <tbody>
          {this.state.grid}
        </tbody>
      </table>
    );
  }
}

export default App;
