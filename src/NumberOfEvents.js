import React, { Component } from 'react';
import { ErrorAlert } from './Alert';


class NumberOfEvents extends Component {
    state = {
        numberOfEvents: 32,
        errorText: '',
    };

    handleInputChanged = (event) => {
        const value = event.target.value;
        if (value < 1 || value > 32) {
            this.setState({
                numberOfEvents: value,
                errorText: 'Enter number from 1 to 32',
            })
        } else {
            this.setState({
                numberOfEvents: value,
                errorText: '',
            });
            this.props.updateEvents(undefined, value);
        }
    };

    render() {
        return (
            <div>
                <div className="numberOfEvents">
                    <label>
                        Number of Events:
                        <input
                            type="number"
                            className="number-of-events-input"
                            min="1"
                            value={this.state.numberOfEvents}
                            onChange={this.handleInputChanged}
                        />
                    </label>
                </div>
                <ErrorAlert text={this.state.errorText} />
            </div>
        );
    }
}

export default NumberOfEvents;