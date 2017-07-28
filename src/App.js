import React, { Component } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import Cell from './Cell';

class App extends Component {
  constructor(props) {
    super(props);
    this.state={
      width:10,
      height: 10,
      gridStatus: [],
      speed: 2000
    }
    this.regenerateGrid = this.regenerateGrid.bind(this);
    this.changeSpeed = this.changeSpeed.bind(this);
    this.pauseGame = this.pauseGame.bind(this);
  }
  
  componentDidMount() {
    this.startGame();
    this.newGeneration = setInterval(this.regenerateGrid, this.state.speed);
  }
  componentWillUnmount() {
    clearInterval(this.newGeneration);
  }
  
  componentDidUpdate(prevProps,prevState) {
    if (prevState.gridStatus !== this.state.gridStatus) {
      this.renderGrid();
    }
    if (prevState.speed !== this.state.speed) {
      clearInterval(this.newGeneration);
      this.newGeneration = setInterval(this.regenerateGrid, this.state.speed);
    }
    if (prevState.pause !== this.state.pause) {
      this.state.pause ? clearInterval(this.newGeneration) : this.newGeneration = setInterval(this.regenerateGrid, this.state.speed);
    }
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
  
  changeSpeed (event) {
    console.log(event.target.dataset.speed)
    this.setState({speed: event.target.dataset.speed})
  }
  pauseGame() {
    this.setState({pause: !this.state.pause});
  }
  render() {
    return (
      <div>
        <table>
          <tbody>
            {this.state.grid}
          </tbody>
        </table>
        <ButtonGroup>
          <Button active={this.state.speed === 3000 ? true : false} data-speed={3000} onClick={this.state.speed === 3000 ? null : this.changeSpeed}>Slow</Button>
          <Button active={this.state.speed === 2000 ? true : false} data-speed={2000} onClick={this.state.speed === 2000 ? null : this.changeSpeed}>Medium</Button>
          <Button active={this.state.speed === 1000 ? true : false} data-speed={1000} onClick={this.state.speed === 1000 ? null : this.changeSpeed}>Fast</Button>
        </ButtonGroup>
        <Button active={this.state.pause} onClick={this.pauseGame}>Pause</Button>
      </div>
    );
  }
}

export default App;
