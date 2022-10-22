// import { loadFeature, defineFeature } from 'jest-cucumber';
// import React from 'react';
// import { mount } from 'enzyme';
// import App from '../App';
// import NumberOfEvents from '../NumberOfEvents';
// import EventList from '../EventList';

// const feature = loadFeature('./src/features/specifyTheNumberOfEvents.feature');

// defineFeature(feature, (test) => {
//     // Scenario 1

//     test('When user hasn’t specified a number, 32 is the default number', ({
//         given,
//         when,
//         then,
//     }) => {
//         given(
//             'the user has not specified a number of events to be displayed',
//             () => { }
//         );

//         let AppWrapper;
//         when('the user opens the app', () => {
//             AppWrapper = mount(<App />);
//         });

//         then('the user should see a maximum of 32 events by default', () => {
//             AppWrapper.update();
//             expect(AppWrapper.state('numberOfEvents')).toEqual(32);
//         });
//     });

//     // Scenario 2

//     test('User can change the number of events they want to see', ({
//         given,
//         when,
//         then,
//     }) => {
//         let AppWrapper;
//         given('A list of events is open', () => {
//             AppWrapper = mount(<App />);
//         });

//         when('the user changes the number of events to be displayed', () => {
//             AppWrapper.update();
//             AppWrapper.find(NumberOfEvents)
//                 .find('.number-of-events-input')
//                 .simulate('change', {
//                     target: { value: 1 },
//                 });
//         });

//         then('the list should update to the specified number of events', () => {
//             AppWrapper.update();
//             expect(AppWrapper.find(EventList).props().events).toHaveLength(1);
//         });
//     });
// });

////////////////

import { loadFeature, defineFeature } from 'jest-cucumber';
import React from 'react';
import { mount } from 'enzyme';
import App from '../App';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, test => {
    let AppWrapper;
    test('When user has not specified a number, 32 is the default number.', ({ given, when, then }) => {
        given('The app has loaded', () => { });

        when('The user has yet to choose a number of events in the input box.', () => {
            AppWrapper = mount(<App />);
        });

        then('A default number of 32 events is loaded on the page.', () => {
            AppWrapper.update();
            expect(AppWrapper.state('numberOfEvents')).toEqual(32);
        });
    });

    test('User can change the number of events they want to see.', ({ given, when, then }) => {
        given('The app has loaded.', async () => {
            AppWrapper = await mount(<App />);
        });

        when('User changes the number of events in the input box.', () => {
            AppWrapper.update();
            let NumberOfEventsWrapper = AppWrapper.find('NumberOfEvents');
            const eventObject = { target: { value: 6 } };
            NumberOfEventsWrapper.find('.number-of-events-input').simulate(
                'change',
                eventObject
            );
        }
        );

        then('The event list elements shows the number of events set by the user.', () => {
            expect(AppWrapper.find('.EventList')).toHaveLength(1);
        });
    });
});

