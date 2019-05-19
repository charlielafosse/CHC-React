import React from "react";
import StalkComp from "./stalkComp";
import LeafComp from "./leafComp";
import FlowerComp from "./flowerComp";
import PlantPotComp from "./plantPotComp";
import CloudComp from "./cloudComp";


export default class App extends React.Component {
  state = {
    totalCount: 0,
    timer: 60,
    timerId: 0,
    opponentTimerId: 0,
    active: false,
    gameOver: false,
    highScore: 0,
    level: 1
  };

  gameOver = () => {
    const speed = (60 - this.state.timer);
    if(speed < this.state.highScore || this.state.highScore === 0){
      this.setState({ highScore: speed})
    }
    this.reset();
    this.setState(() => {
      return { gameOver: true, level: this.state.level +1};
    });
  };
  pointCounter = () => {
    if (this.state.totalCount === 29) {
      this.gameOver();
    }
    this.setState({ totalCount: this.state.totalCount + 1 });
  };
  reset = () => {
    clearInterval(this.state.timerId);
    clearInterval(this.state.opponentTimerId);
    this.setState({  timer: 60 - (this.state.level * 10), active: false, totalCount: 0, gameOver: false });
  };
  toggle = () => {
    if (!this.state.active) {
      this.start();
    } else {
      this.reset();
    }
  };

  start = () => {
    const timer = () => {
      this.setState(prevState => {
        return { timer: (prevState.timer -= 1) };
      });
    };

    const opponentTimer = () => {
      this.setState(prevState => {
        return { totalCount: (prevState.totalCount -= 3) };
      });
    };

    if (!this.state.active) {
      this.setState(() => {
        const id = setInterval(timer, 1000);
        const oppId = setInterval(opponentTimer, 3000);
        return { active: true, timerId: id, opponentTimerId: oppId };
      });
    }
  };

  render() {
    const stalks = Array.from({
      length: Math.floor(this.state.totalCount / 3)
    });
    const leafs = Array.from({
      length: Math.floor(this.state.totalCount / 10)
    });
    return (
      <div>
        <ul>
        <li><p className="timer"> timer: {this.state.timer}</p></li>
        <li>
        <button onClick={this.toggle}>
          {this.state.active || this.state.gameOver ? "Reset" : "Start"}
        </button>
        <button
          className={this.state.active ? "" : "grey"}
          onClick={this.pointCounter}
        >
          💦💧Water Me💧💦
        </button>
        </li>
        <li><p className="timer float-right"> points: {this.state.totalCount}</p></li>
        <li><p className="timer float-right"> speed record: {this.state.highScore}s</p></li>
        <li><p className="timer"> level: {this.state.level}</p></li>
        <div className="clear" />
        </ul>
        <div className="container">
          <CloudComp />
          <PlantPotComp />
          {stalks.map((stalk, id) => (
            <StalkComp id={id} />
          ))}
          {leafs.map((leaf, id) => (
            <LeafComp id={id} />
          ))}
          <FlowerComp gameOver={this.state.gameOver} />
        </div>
      </div>
    );
  }
}
