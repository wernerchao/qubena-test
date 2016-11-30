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
            // Taken out to use Quebena code for data visualization exercise
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
                        fill: false,
                        backgroundColor: 'rgba(255, 99, 132, 1)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        label: 'Year 1894',
                        data: [-54, -31, -21, -40, -29, -43, -31, -26, -22, -16, -24, -21]
                    },
                    {
                        fill: false,
                        backgroundColor: 'rgba(30,144,255, 1)',
                        borderColor: 'rgba(30,144,255, 1)',
                        label: 'Year 1924',
                        data: [-21, -25, -11, -33, -17, -26, -25, -32, -29, -34, -21, -40] 
                    },
                    {
                        fill: false,
                        backgroundColor: 'rgba(255,127,80, 1)',
                        borderColor: 'rgba(255,127,80, 1)',
                        label: 'Year 1954',
                        data: [-27, -10, -12, -18, -20, -15, -16, -12, -7, 0, 9, -16] 
                    },
                    {
                        fill: false,
                        backgroundColor: 'rgba(95,158,160, 1)',
                        borderColor: 'rgba(95,158,160, 1)',
                        label: 'Year 1984',
                        data: [31, 18, 29, 10, 34, 6, 15, 15, 19, 15, 4, -6] 
                    },
                    {
                        fill: false,
                        backgroundColor: 'rgba(50,50,50, 1)',
                        borderColor: 'rgba(50,50,50, 1)',
                        label: 'Year 2014',
                        data: [74, 50, 77, 78, 86, 66, 58, 82, 90, 86, 68, 79] 
                    },
                ]
            },
            // Taken out to use Quebena code for data visualization exercise
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
                // var wrongs = data["wrongs"]; // Taken out to use Quebena code for data visualization exercise
                // var ratio = data["correct_ratios"]; // Taken out to use Quebena code for data visualization exercise
                var total = data["totals"];
                this.setState({
                    // chartData: this.tempData(labels, corrects, wrongs, "Correct Questions", "Wrong Questions"), // Taken out to use Quebena code for data visualization exercise
                    lineChartData: this.tempData(labels, corrects, total, "Correct Questions", "Total Questions"),
                    // ratioChartData: this.tempData(labels, ratio, '') // Taken out to use Quebena code for data visualization exercise
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
                    <h2>Welcome to Werner's Data Visualization of GISTEMP</h2>
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
                                        fontSize: 20,
                                        text: 'Global Surface Temperature vs Months for Every 30 Years Since 1894'
                                    },
                                    legend: {
                                        position: 'bottom',
                                    },
                                    scales: {
                                        xAxes: [{
                                            gridLines: {
                                                display: false,
                                            },
                                        }],
                                        yAxes: [{
                                        gridLines: {
                                            display: false,
                                        },
                                        scaleLabel: {
                                            display: true,
                                            labelString: 'Temperature'
                                        }
                                        }]
                                    },
                                    multiTooltipTemplate: "<%= value + ' %' %>"
                                }}
                                type='line'
                                />
                        </Col>
                    </Row>
                        <div></div>
                        <br />
                        <div></div>
                        <br />
                    <Row>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default App;

                    // Taken out to use Quebena code for data visualization exercise
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