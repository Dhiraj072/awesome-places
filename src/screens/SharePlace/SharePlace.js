import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import AddPlaceForm from '../../components/AddPlaceForm/AddPlaceForm';
import { addPlace } from '../../store/actions/places';

const SharePlaceScreen = (props) => (
    <View>
        <AddPlaceForm
            placeSubmitHandler={props.addPlace}
        />
    </View>
);

const mapDispatchToProps = (dispatch) => ({
    addPlace: (place) => dispatch(addPlace(place)),
});

export default connect(undefined, mapDispatchToProps)(SharePlaceScreen);
