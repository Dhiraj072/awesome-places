import React from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import AddPlaceForm from '../../components/AddPlaceForm/AddPlaceForm';
import { addPlace } from '../../store/actions/places';
import Heading1 from '../../components/UI/Heading1/Heading1';
import ImagePreview from '../../components/ImagePreview/ImagePreview';
import placeImage from '../../assets/surfer.jpg';
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
                    <ImagePreview image={placeImage} />
                    <MainButton>Pick Image</MainButton>
                    <View><Text>Map</Text></View>
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
