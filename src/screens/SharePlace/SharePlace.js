import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import AddPlaceForm from '../../components/AddPlaceForm/AddPlaceForm';
import ImagePicker from '../../components/ImagePicker/ImagePicker';
import LocationPicker from '../../components/LocationPicker/LocationPicker';
import { addPlace } from '../../store/actions/places';
import Heading1 from '../../components/UI/Heading1/Heading1';
import MainButton from '../../components/UI/MainButton/MainButton';

class SharePlaceScreen extends React.Component {
    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
    }
    onNavigatorEvent = (event) => {
        if (event.type === 'NavBarButtonPress') {
            if (event.id === 'sideDrawer') {
                this.props.navigator.toggleDrawer({
                    side: 'left',
                });
            }
        }
    }

    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <Heading1 text="Share a place!" />
                    <ImagePicker />
                    <LocationPicker />
                    <AddPlaceForm />
                    <MainButton>Add Place</MainButton>
                </View>
            </ScrollView>

        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    addPlace: (place) => dispatch(addPlace(place)),
});

export default connect(undefined, mapDispatchToProps)(SharePlaceScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
