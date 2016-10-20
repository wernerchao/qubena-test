import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Bar } from 'react-chartjs-2';
import TempData from './utilities/data.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: {
          labels: ["January", "February", "March", "April", "May", "June", "July"],
          datasets: [
              {
                  label: "My First dataset",
                  backgroundColor: 'rgba(255, 99, 132, 0.2)',
                  borderColor: 'rgba(255, 99, 132)',
                  borderWidth: 1,
                  data: [65, 59, 80, 81, 56, 55, 40],
              },
              {
                  label: "My Second dataset",
                  backgroundColor: 'rgba(54, 162, 235, 0.2)',
                  borderColor: 'rgba(54, 162, 235)',
                  borderWidth: 1,
                  data: [6, 5, 8, 8, 5, 5, 4],
              }
          ]
      }
    }
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Bar data={this.state.chartData} />
        <TempData source="http://develop.qubena.com/v4/api/playlogs/question_collect_rate/" />
      </div>
    );
  }
}

export default App;
