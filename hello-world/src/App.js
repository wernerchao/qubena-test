import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Bar } from 'react-chartjs-2';
// import TempData from './utilities/data.js'; NEVER USED

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      chartData: {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [
            {
                label: "My First dataset",
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(255, 99, 132)',
                borderWidth: 1,
                data: [6, 5, 8, 8, 5, 5, 4, ],
            },
            {
              label: "My Second dataset",
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgba(255, 99, 132)',
              borderWidth: 1,
              data: [6, 5, 8, 8, 5, 5, 4, ],
            }
        ]
      }, 
    }
  }
  componentDidMount() {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (request.readyState === 4 && request.status === 200) {
            var json = request.responseText;
            var data = JSON.parse(json);
            var labels = data["questions"];
            var corrects = data["corrects"];
            var wrongs = data["wrongs"];

            this.setState({ chartData: this.tempData(labels, corrects, wrongs) });

            console.log("1. Debugging: " + data["questions"]);
        }
    }.bind(this);
    request.open("POST", "http://develop.qubena.com/v4/api/playlogs/question_collect_rate/", true);
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    request.send("subsection_id=1");
    }
  tempData(labels, corrects, wrongs) {
    var tempDataObject = {
          labels: labels,
          datasets: [
              {
                  label: "Correct Questions",
                  backgroundColor: 'rgba(54, 162, 235, 0.2)',
                  borderColor: 'rgba(54, 162, 235, 1)',
                  borderWidth: 1,
                  data: corrects,
              },
              {
                  label: "Wrong Questions",
                  backgroundColor: 'rgba(255, 99, 132, 0.2)',
                  borderColor: 'rgba(255, 99, 132, 1)',
                  borderWidth: 1,
                  data: wrongs,
              }
          ]
    }
    return tempDataObject;
  }
  componentWillUnmount() {
      this.serverRequest.abort();
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
      </div>
    );
  }
}

export default App;
