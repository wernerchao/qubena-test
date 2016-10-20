import React, { Component } from 'react';

class TempData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tempData: '',
        }
    }
    componentDidMount() {
        var request = new XMLHttpRequest();
        request.onreadystatechange = function() {
            if (request.readyState === 4 && request.status === 200) {
                var json = request.responseText;
                var data = JSON.parse(json);
                this.setState({ tempData: json });
                console.log("wrongs length is: " + data["wrongs"].length);
                console.log("correct_ratios length is: " + data["correct_ratios"].length);
                console.log("corrects length is: " + data["corrects"].length);
                console.log("totals length is: " + data["totals"].length);
            }
        }.bind(this);
        request.open("POST", this.props.source, true);
        request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        request.send("subsection_id=1");
    }
    componentWillUnmount() {
        this.serverRequest.abort();
    }
    render() {
        return (
        <div>
            {this.state.tempData}
        </div>
        );
    }
}

export default TempData;