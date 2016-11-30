import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import RC2 from 'react-chartjs2';
import {
    Grid, Col, Row,
    FormGroup, ControlLabel, FormControl, HelpBlock
} from 'react-bootstrap';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { //initial data for 3 graphs
            subsectionId: "",
            // chartData: {
            //     labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            //     datasets: [
            //         {
            //             data: [29, 19, 17, 27, 13, 28, 22, 6, 16, 15, 18, 20] 
            //         }
            //     ]
            // },
            lineChartData: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [
                    {
                        data: [29, 19, 17, 27, 13, 28, 22, 6, 16, 15, 18, 20] 
                    }
                ]
            },
            // ratioChartData: {
            //     labels: [],
            //     datasets: []
            // },
        }
    }
    componentDidMount() { //establish the connection
        this.fetchData(this.state.subsectionId);
    }
    fetchData = (idNumber) => { //fetch the data here
        var request = new XMLHttpRequest();
        request.onreadystatechange = function () {
            if (request.readyState === 4 && request.status === 200) {
                var json = request.responseText;
                var data = JSON.parse(json);
                var labels = data["questions"];
                var corrects = data["corrects"];
                // var wrongs = data["wrongs"];
                // var ratio = data["correct_ratios"];
                var total = data["totals"];
                this.setState({
                    // chartData: this.tempData(labels, corrects, wrongs, "Correct Questions", "Wrong Questions"),
                    lineChartData: this.tempData(labels, corrects, total, "Correct Questions", "Total Questions"),
                    // ratioChartData: this.tempData(labels, ratio, '')
                });
            }
        }.bind(this);
        request.open("POST", "http://develop.qubena.com/v4/api/playlogs/question_collect_rate/", true);
        request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
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
        console.log('handleChange ' + this.state.subsectionId);
    }
    handleSubmit = (e) => { //prevent refreshes upon Enter
        e.preventDefault();
    }
    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h2>Welcome to React - Werner's Test for COMPASS Inc.</h2>
                </div>
                <br />
                <Grid>
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
                </Grid>
            </div>
        );
    }
}

export default App;

                    // <Row>
                    //     <Col xs={4} xsOffset={4}>
                    //         <form onSubmit={this.handleSubmit}>
                    //             <FormGroup>
                    //                 <ControlLabel>Type in an integer between 1~164: </ControlLabel>
                    //                 <FormControl
                    //                     type="text"
                    //                     name="subsection"
                    //                     value={this.state.subsectionId}
                    //                     onChange={this.handleChange}
                    //                     placeholder="1~164"
                    //                     />
                    //                 <FormControl.Feedback />
                    //                 <HelpBlock></HelpBlock>
                    //             </FormGroup>
                    //         </form>
                    //     </Col>
                    // </Row>
                    // <Row>
                    //     <Col xs={12}>
                    //         <RC2
                    //             data={this.state.chartData}
                    //             options={{
                    //                 maintainAspectRatio: true,
                    //                 title: {
                    //                     display: true,
                    //                     text: 'Chart 1: Comparing Correct and Wrong Questions'
                    //                 },
                    //             }}
                    //             type='bar'
                    //             />
                    //     </Col>
                    // </Row>


                    // <Row>
                    //     <Col xs={12}>
                    //         <RC2
                    //             data={this.state.ratioChartData}
                    //             options={{
                    //                 maintainAspectRatio: true,
                    //                 showLines: false,
                    //                 legend: false,
                    //                 title: {
                    //                     display: true,
                    //                     text: 'Chart 3: Ratio(%) of Correct Questions'
                    //                 }
                    //             }}
                    //             type='line'
                    //             />
                    //     </Col>
                    // </Row>