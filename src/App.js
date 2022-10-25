import React, { Component } from 'react';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents.js';
import { extractLocations, getEvents } from './api';
import { OfflineAlert } from './Alert';

import './App.css';
class App extends Component {
  state = {
    events: [],
    locations: [],
    numberOfEvents: 32,
    selectedLocation: 'all',
    offlineAlertText: ''
  };

  updateEvents = (location, eventCount) => {
    const { numberOfEvents } = this.state;

    if (!navigator.onLine) {
      this.setState({ offlineAlertText: 'You are currently offline. Events have been loaded from your last session' });
    } else {
      this.setState({ offlineAlertText: '' });
    };

    if (location === undefined) location = this.state.selectedLocation;
    getEvents().then((events) => {
      const locationEvents =
        location === 'all'
          ? events
          : events.filter((event) => event.location === location);
      eventCount = eventCount === undefined ? numberOfEvents : eventCount;
      this.setState({
        events: locationEvents.slice(0, eventCount),
        selectedLocation: location,
        numberOfEvents: eventCount,
      });
    });
  };

  componentDidMount() {
    this.mounted = true;
    getEvents().then((events) => {
      if (this.mounted) {
        this.setState({ events, locations: extractLocations(events) });
      }
    });
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    const { numberOfEvents } = this.state;
    return (
      <div className="App">
        <h1>Meet App</h1>
        <h4>Choose your nearest city</h4>
        <OfflineAlert text={this.state.offlineAlertText} />
        <div className='navbar'>
          <CitySearch
            locations={this.state.locations}
            updateEvents={this.updateEvents}
          />
          <NumberOfEvents
            numberOfEvents={numberOfEvents}
            updateEvents={this.updateEvents}
          />
        </div>
        <div className='eventObject'>
          <EventList events={this.state.events} />
        </div>
      </div>
    );
  }
}

export default App;