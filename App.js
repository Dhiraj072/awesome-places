import React from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import AddPlaceForm from './src/components/AddPlaceForm/AddPlaceForm';
import PlaceList from './src/components/PlaceList/PlaceList';
import PlaceDetail from './src/components/PlaceDetail/PlaceDetail';
import { addPlace, deleteSelectedPlace, selectPlace, deSelectPlace } from './src/store/actions/places';

export class AppComponent extends React.Component {
    placeSubmitHandler = (placeName) => {
        const place = {
            key: Math.random(),
            name: placeName,
            image: {
                uri: 'https://images.pexels.com/photos/692064/pexels-photo-692064.jpeg?w=1260&h=750&dpr=2&auto=compress&cs=tinysrgb',
            },
        };
        this.props.addPlace(place);
    };

    placeDeletedHandler = () => {
        this.props.deleteSelectedPlace();
    }

    placeSelectedHandler = (place) => {
        this.props.selectPlace(place);
    }

    modalCloseHandler = () => {
        this.props.deSelectPlace();
    }

    render() {
        return (
            <View style={styles.container}>
                <AddPlaceForm
                    placeNameChangedHandler={this.placeNameChangedHandler}
                    placeSubmitHandler={this.placeSubmitHandler}
                />
                <PlaceList
                    places={this.props.places}
                    onPlaceListItemPress={this.placeSelectedHandler}
                />
                <PlaceDetail
                    place={this.props.selectedPlace}
                    handleDeletePlace={this.placeDeletedHandler}
                    handleModalClose={this.modalCloseHandler}
                />
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    places: state.app.places,
    selectedPlace: state.app.selectedPlace,
});

const mapDispatchToProps = (dispatch) => ({
    addPlace: (place) => dispatch(addPlace(place)),
    deleteSelectedPlace: (place) => dispatch(deleteSelectedPlace(place)),
    selectPlace: (place) => dispatch(selectPlace(place)),
    deSelectPlace: () => dispatch(deSelectPlace()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppComponent);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 26,
    },
});
