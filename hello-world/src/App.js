import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
// import { HorizontalBar } from 'react-chartjs-2';
import RC2 from 'react-chartjs2';
import {
    Grid, Col, Row,
    FormGroup, ControlLabel, FormControl, HelpBlock
} from 'react-bootstrap';
// import InputId from './components/input';
// import TempData from './utilities/data'; NEVER USED

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      subsectionId: 1,
      dataLength: 7,
      chartData: {
        labels: ["January"],
        datasets: [
            {
                label: "My First dataset",
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(255, 99, 132)',
                borderWidth: 1,
                data: [6],
            },
            {
              label: "My Second dataset",
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgba(255, 99, 132)',
              borderWidth: 1,
              data: [6],
            }
        ]
      },
      lineChartData: {
        labels: ["January"],
        datasets: [
            {
                label: "My First dataset",
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(255, 99, 132)',
                borderWidth: 1,
                data: [6],
            },
            {
              label: "My Second dataset",
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgba(255, 99, 132)',
              borderWidth: 1,
              data: [6],
            }
        ]
      },
      ratioChartData: {
        labels: ["January"],
        datasets: [
            {
                label: "My First dataset",
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(255, 99, 132)',
                borderWidth: 1,
                data: [6],
            },
            {
              label: "My Second dataset",
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgba(255, 99, 132)',
              borderWidth: 1,
              data: [6],
            }
        ]
      },
    }
  }
  componentDidMount() { //establish the connection
    this.fetchData(this.state.subsectionId);
  }
  fetchData(idNumber) { //fetch the data here
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (request.readyState === 4 && request.status === 200) {
            var json = request.responseText;
            var data = JSON.parse(json);
            var labels = data["questions"];
            var corrects = data["corrects"];
            var wrongs = data["wrongs"];
            var ratio = data["correct_ratios"];
            var total = data["totals"];

            this.setState({ 
              dataLength: labels.length, 
              chartData: this.tempData(labels, corrects, wrongs, "Correct Questions", "Wrong Questions"),
              lineChartData: this.tempData(labels, corrects, total, "Correct Questions", "Total Questions"),
              ratioChartData: this.tempData(labels, ratio, '')
            });

            console.log("1. Debugging Length: " + this.state.dataLength);
        }
    }.bind(this);
    request.open("POST", "http://develop.qubena.com/v4/api/playlogs/question_collect_rate/", true);
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    console.log("request: " + idNumber);
    request.send("subsection_id=" + idNumber);
  }
  tempData = (labels, corrects, wrongs, label1, label2) => { //process the data here
    var tempDataObject = {
      labels: labels,
      datasets: [
          {
              label: label1,
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1,
              data: corrects,
          },
          {
              label: label2,
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1,
              data: wrongs,
          }
      ]
    }
    return tempDataObject;
  }
  componentWillUnmount() { //clear out the connection
      this.serverRequest.abort();
  }
  handleChange = (e) => { //get new chart as soon as new integer entered
    this.setState({ subsectionId: e.target.value });
    this.fetchData(e.target.value);
    console.log('handleChange '+ this.state.subsectionId);
  }
  handleSubmit = (e) => { //prevent refreshes upon Enter
    e.preventDefault();
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <br />
        <Grid>
          <Row>
            <Col xs={4} xsOffset={4}>
              <form onSubmit={this.handleSubmit}>
                  <FormGroup>
                      <ControlLabel>Type in an integer: </ControlLabel>
                      <FormControl 
                        type="text" 
                        name="subsection" 
                        value={this.state.subsectionId}
                        onChange={this.handleChange} 
                        placeholder="1~163" 
                        />
                      <FormControl.Feedback />
                      <HelpBlock></HelpBlock>
                  </FormGroup>
              </form>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <RC2 
                data={this.state.chartData} 
                options={{
                    maintainAspectRatio: true,
                    title: {
                        display: true,
                        text: 'Chart 1: Comparing Correct and Wrong Questions'
                    },
                    
                  }} 
                type='bar'
              />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <RC2 
                data={this.state.lineChartData} 
                options={{
                    maintainAspectRatio: true,
                    title: {
                        display: true,
                        text: 'Chart 2: Correct Questions out of Total Questions'
                    }
                  }}
                type='line'
              />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <RC2 
                data={this.state.ratioChartData} 
                options={{
                    maintainAspectRatio: true,
                    legend: false,
                    title: {
                        display: true,
                        text: 'Chart 3: Ratio of Correct Questions'
                    }
                  }} 
                type='bar'
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default App;

// <HorizontalBar
//   height={height}
//   width={width}
//   data={this.state.chartData}
//   options={{
//     maintainAspectRatio: false,
//   }}
// />

// <RC2 
// data={this.state.chartData} 
// options={{
//     maintainAspectRatio: true,
//   }} 
// type='horizontalBar' />