import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import PlaceDetail from '../../components/PlaceDetail/PlaceDetail';
import { deletePlace } from '../../store/actions/places';

const PlaceDetailScreen = (props) => {
    const handleDeletePlace = () => {
        props.deletePlace(props.place);
        props.navigator.pop();
    };
    return (
        <View>
            <PlaceDetail
                place={props.place}
                handleDeletePlace={handleDeletePlace}
            />
        </View>
    );
};

const mapDispatchToProps = (dispatch) => ({
    deletePlace: (place) => dispatch(deletePlace(place)),
});

export default connect(undefined, mapDispatchToProps)(PlaceDetailScreen);

