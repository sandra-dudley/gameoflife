import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import Cell from './Cell';

class App extends Component {
  constructor(props) {
    super(props);
    this.state={
      width:10,
      height: 10,
      gridStatus: [],
    }
    this.regenerateGrid = this.regenerateGrid.bind(this)
  }
  
  componentDidMount() {
    this.startGame();
    this.newGeneration = setInterval(this.regenerateGrid, 3000);
  }
  componentWillUnmount() {
    clearInterval(this.newGeneration);
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
  
  regenerateGrid() {
    //let prevGrid = this.state.gridStatus;
    //let newGrid = [];
    let rows = [];
    for (let y = 0; y < this.state.height; y ++) {
      let row = [];
      for (let x = 0; x < this.state.width; x ++) {
        
        let topLeft = (y > 0 && x > 0) ? ( (this.state.gridStatus[y-1][x-1]==="alive")? 1 : 0 )  : 0;
        let top = (y > 0) ? ( (this.state.gridStatus[y-1][x]==="alive")? 1 : 0 )  : 0;
        let topRight = (y > 0 && x < this.state.width) ? ( (this.state.gridStatus[y-1][x+1]==="alive")? 1 : 0 )  : 0;
        let left = (x > 0) ? ( (this.state.gridStatus[y][x-1]==="alive")? 1 : 0 )  : 0;
        let right = ( x < this.state.width) ? ( (this.state.gridStatus[y][x+1]==="alive")? 1 : 0 )  : 0;
        let bottomLeft = (y < this.state.height -1 && x > 0) ? ( (this.state.gridStatus[y+1][x-1]==="alive")? 1 : 0 )  : 0;
        let bottom = (y < this.state.height - 1) ? ( (this.state.gridStatus[y+1][x]==="alive")? 1 : 0 )  : 0;
        let bottomRight = (y < this.state.height - 1 && x < this.state.width) ? ( (this.state.gridStatus[y+1][x+1]==="alive")? 1 : 0 )  : 0;
        
        let current = this.state.gridStatus[y][x];
        let neighbours = topLeft + top + topRight + left + right + bottomLeft + bottom + bottomRight;

        
        if (current === "alive") {
          if (neighbours < 2 || neighbours > 3) {
            current = "dead";
          }
        } else {
          if (neighbours === 3) {
            current = "alive";
          }
        }

       row.push(current)

      }
      rows.push(row);
      
    }
    console.log(this.state.gridStatus[0][0], rows[0][0])
    this.setState({gridStatus: rows})
  }
  
  checkStatus (current, neighbours) {
    let newStatus = current;
    if (current === "alive") {
      if (neighbours < 2 || neighbours > 3) {
        newStatus = "dead";
      }
    } else {
      if (neighbours === 3) {
        newStatus = "alive";
      }
    }
    return newStatus;
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
      <div>
        <table>
          <tbody>
            {this.state.grid}
          </tbody>
        </table>
        <Button>Value</Button>   <Button bsStyle="primary">Primary</Button>
      </div>
    );
  }
}

export default App;
