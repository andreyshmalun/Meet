import React, { Component } from 'react';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents.js';
import { OfflineAlert } from './Alert';
import { getEvents, extractLocations, checkToken, getAccessToken } from './api';
import WelcomeScreen from './WelcomeScreen';
import {
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import EventGenre from './EventGenre';

import './App.css';
class App extends Component {
  state = {
    events: [],
    locations: [],
    numberOfEvents: 32,
    selectedLocation: 'all',
    offlineAlertText: '',
    showWelcomeScreen: undefined,
  };

  getData = () => {
    const { locations, events } = this.state;
    const data = locations.map((location) => {
      const number = events.filter((event) => event.location === location).length
      const city = location.split(', ').shift()
      return { city, number };
    })
    return data;
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

  async componentDidMount() {
    this.mounted = true;
    const accessToken = localStorage.getItem('access_token');
    const isTokenValid = (await checkToken(accessToken)).error ? false : true;
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("code");
    this.setState({ showWelcomeScreen: !(code || isTokenValid) });
    if ((code || isTokenValid) && this.mounted) {
      getEvents().then((events) => {
        if (this.mounted) {
          this.setState({ events, locations: extractLocations(events) });
        }
      });
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    const { numberOfEvents, events } = this.state;
    if (this.state.showWelcomeScreen === undefined) return <div
      className="App" />

    return (
      <div className="App">
        <h1>Meet App</h1>
        <h4 className='top-heading'>Choose your nearest city</h4>
        <OfflineAlert text={this.state.offlineAlertText} />
        <CitySearch
          locations={this.state.locations}
          updateEvents={this.updateEvents}
        />
        <NumberOfEvents
          numberOfEvents={numberOfEvents}
          updateEvents={this.updateEvents}
        />
        <h4>Events in each city</h4>
        <div className="data-vis-wrapper">
          <EventGenre events={events} />
          <ResponsiveContainer height={400}>
            <ScatterChart
              margin={{
                top: 20, right: 20, bottom: 20, left: -20,
              }}
            >
              <CartesianGrid />
              <XAxis type="category" dataKey="date" name="date" />
              <YAxis type="number" dataKey="number" name="number of events" allowDecimals={false} />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Scatter data={this.getData()} fill="#c19191" />
            </ScatterChart>
          </ResponsiveContainer>
        </div>


        <div className='eventObject'>
          <EventList events={this.state.events} />
        </div>

        <WelcomeScreen showWelcomeScreen={this.state.showWelcomeScreen}
          getAccessToken={() => { getAccessToken() }} />
      </div>
    );
  }
}

export default App;