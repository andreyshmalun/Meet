# Meetapp

Connect with likeminded people in your city by finding events you are interested in.

## Objectives

- Build a serverless React PWA (for online and offline use).
- Follow a BDD & TDD methodology (scenarios & stories, red-green-refactor, quick feedback).
- Fetch event data from Google Calendar API.
- Data visualisation (number of upcoming events, & popularity of event genres)

### Context

- Serverless allows: less backend maintenance, increased scalability, high availability.
- PWA's allow: instant loading, offline availability, and cross-platform features.

## Features

### **1. Search events by city**

**_Scenario 1:_** When user hasn’t searched for a city, show upcoming events from all cities.

> _User Story_: As a user, I should be able to filter events by city, so that I can see the list of events that take place in that city.

_Given_ user hasn't serached for any city,

_When_ the user opens the app,

_Then_ the user should see a list of all upcoming events.
<br><br>

**Scenario 2:** User should see a list of suggestions when they search for a city.

> _User Story_: As a user, I should be able to see a list of suggestsions when I start typing, so that events that I am show are near my location.

_Given_ the main page is open,

_When_ the user starts typing in the city textbox,

_Then_ the user should see a list of cities (suggestions) that match what they've typed.
<br><br>

**Scenario 3:** User can select a city from the suggested list.

> _User Story_: As a user, I should be able to select a city from the sugessted list, so that I can see events relevant to my location.

_Given_ city suggestsions are visible after a user typed something in the city textbox,

_When_ the user selects a city from the list,

_Then_ user's city should be changed to their selection, and be shown that city's list of events
<br><br>

### **2. Toggle info visibility**

**Scenario 1:** An event element is collapsed by default

> _User Story_: As a user, I should see a list of events without details, so that I can quickly get an overview of what is available.

_Given_ a user has searched for a city,

_When_ the list of events is shown,

_Then_ all events details should be hidden.
<br><br>

**Scenario 2:** User can expand an event to see its details

> _User Story_: As a user, I should be able to reveal event details, so that I can get a more in-depth idea of what the event is about.

_Given_ a list of unexpanded events are shown,

_When_ a user clicks on an event,

_Then_ event details should be revealed.
<br><br>

**Scenario 3:** User can collapse an event to hide its details

> _User Story_: As a user, I should be able to hide event details, so that I can go back to seeing the main overview of available events.

_Given_ an event has had its details expanded,

_When_ a user hides details,

_Then_ the event's details should collapse.
<br><br>

### **3. Select number of events to show**

**Scenario 1:** When user hasn’t specified a number, 32 is the default number

> _User Story_: As a user, I should be able to see a list of events by default, so that I can get started searching immediately.

_Given_ a number of events to be shown has not been specified,

_When_ a user searches for events in a city,

_Then_ a list of 32 events should be shown.
<br><br>

**Scenario 2:** User can change the number of events they want to see

> _User Story_: As a user, I should be able to change the number of events shown, so that I can choose whether many or few are shown.

_Given_ a list of events is shown,

_When_ a user specifies a number of events to show,

_Then_ the list should match the chosen number.
<br><br>

### **4. Available offline**

**Scenario 1:** Show cached data when there’s no internet connection

> _User Story_: As a user, I should be able to access the app offline, so that I can view events even on a patchy connection or when I've run out of data.

_Given_ the app is live,

_When_ connection to internet is lost,

_Then_ app should still work by showing data taken from an offline cache.
<br><br>

**Scenario 2:** Show error when user changes the settings (city, time range)

> _User Story_: As a user, I should be able to see an error message when I do something wrong, so that I can go back to being able to use the app.

_Given_ default time and city settings,

_When_ a user changes city and time settings,

_Then_ an error message should be displayed.
<br><br>

### 5. **Data visualisation**

**Scenario 1:** Show a chart with the number of upcoming events in each city

> _User Story_: As a user, I should be able to see a data visualisation of upcoming events, so that I can better and more easily understand the situation.

_Given_ a city has been chosen,

_When_ a user chooses to view data on upcoming events,

_Then_ appropriate charts and data visualisations should be displayed.
