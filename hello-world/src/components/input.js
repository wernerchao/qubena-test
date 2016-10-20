import React from 'react';
import {
    FormGroup, ControlLabel, FormControl, HelpBlock
} from 'react-bootstrap';

class InputId extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            subsectionId: 1,
        }
    }
    onSubmit = (e) => {
        e.preventDefault();
        this.props.onSubmit(this.state.subsectionId);
        console.log(this.state.subsectionId);
    }
    handleChange = (e) => {
        console.log('handleChange', e.target.value);
        this.setState({ subsectionId: e.target.value });
    }
    render() {
        return (
            <form onChange={this.handleChange} onSubmit={this.onSubmit}>
                <FormGroup>
                    <ControlLabel>Type in an integer: </ControlLabel>
                    <FormControl type="text" name="subsection" value={this.state.subsectionId} placeholder="1~163" />
                    <FormControl.Feedback />
                    <HelpBlock></HelpBlock>
                </FormGroup>
                <input type="submit" />
            </form>
        );
    }
}

export default InputId;