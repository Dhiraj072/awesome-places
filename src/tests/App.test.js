import React from 'react';
import renderer from 'react-test-renderer';
import { AppComponent } from '../../App';

const places = [];
const selectedPlace = {};

it('renders without crashing', () => {
    const rendered = renderer.create(<AppComponent
        places={places}
        selectedPlace={selectedPlace}
    />).toJSON();
    expect(rendered).toBeTruthy();
});
