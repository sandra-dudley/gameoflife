import React, { Component } from 'react';
import update from 'immutability-helper';
import { Button, ButtonGroup, ButtonToolbar } from 'react-bootstrap';
import Cell from './Cell';

class App extends Component {
  constructor(props) {
    super(props);
    this.state={
      width:30,
      height: 10,
      gridStatus: [],
      speed: 2000,
      slow: 3000,
      medium: 2000,
      fast:1000,
      pause: false,
      generation: 0
    }
    this.regenerateGrid = this.regenerateGrid.bind(this);
    this.changeSpeed = this.changeSpeed.bind(this);
    this.pauseGame = this.pauseGame.bind(this);
    this.restartGame = this.restartGame.bind(this);
    this.clearBoard = this.clearBoard.bind(this);
    this.updateGrid = this.updateGrid.bind(this);
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
      console.log("new grid");
      this.renderGrid();
    } else {
      console.log("grid is the same");
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
    let newGeneration = this.state.generation + 1;
    this.setState({generation: newGeneration});
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
          <Cell key={'col'+y+'row'+x} col={y} row={x} updateGrid={this.updateGrid}
          status = { Array.from(this.state.gridStatus)[y][x] }
           />);
      }
      rows.push(<tr key={'col'+y}>{row}</tr>);
    }
    this.setState({grid: rows});
  }
  updateGrid(event) {
    let updatedCell='';
    let targetCol = event.target.dataset.col;
    let targetRow = event.target.dataset.row; 
    updatedCell = this.state.gridStatus[targetCol][targetRow] === "dead" ? "alive" : "dead";
    let newGrid = update(this.state.gridStatus, {
      [parseInt(targetCol)] : {
        [parseInt(targetRow)] : {
          $set: updatedCell
        }
      }
    })
   this.setState({gridStatus: newGrid})
  }
  changeSpeed (event) {
    this.setState({speed: event.target.dataset.speed})
  }
  pauseGame() {
    this.setState({pause: !this.state.pause});
  }
  restartGame () {
    this.startGame();
    this.setState({speed: this.state.medium, pause: false, generation: 0});
  }
  clearBoard () {
    let rows = [];
    for (let y = 0; y < this.state.height; y ++) {
      let row = [];
      for (let x = 0; x < this.state.width; x ++) {
        let rand = Math.random();
        row.push("dead");
      }
      rows.push(row);
    }
    this.setState({gridStatus: rows});
  }
  render() {
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-12">
            <h1>Game of life. Generation: {this.state.generation}</h1>
            <table>
              <tbody>
                {this.state.grid}
              </tbody>
            </table>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-6">
          <h3>Speed</h3>
            <ButtonGroup>
              <Button active={parseInt(this.state.speed) === this.state.slow ? true : false} data-speed={this.state.slow} onClick={parseInt(this.state.slow) === this.state.medium ? null : this.changeSpeed}>Slow</Button>
              <Button active={parseInt(this.state.speed) === this.state.medium ? true : false} data-speed={this.state.medium} onClick={parseInt(this.state.speed) === this.state.medium ? null : this.changeSpeed}>Medium</Button>
              <Button active={parseInt(this.state.speed) === this.state.fast ? true : false} data-speed={this.state.fast} onClick={parseInt(this.state.speed) === this.state.fast ? null : this.changeSpeed}>Fast</Button>
            </ButtonGroup>
          </div>
          <div className="col-md-6">
            <h3>Board control</h3>
            <ButtonToolbar>
              <Button active={this.state.pause} onClick={this.pauseGame}>{this.state.pause? "Play" : "Pause"}</Button>
              <Button onClick={this.restartGame}>Reset game</Button>
              <Button onClick={this.clearBoard}>Clear Board</Button>
            </ButtonToolbar>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
