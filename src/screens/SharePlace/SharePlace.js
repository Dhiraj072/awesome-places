import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import ImagePicker from '../../components/ImagePicker/ImagePicker';
import LocationPicker from '../../components/LocationPicker/LocationPicker';
import { addPlace } from '../../store/actions/places';
import Heading1 from '../../components/UI/Heading1/Heading1';
import MainButton from '../../components/UI/MainButton/MainButton';
import Input from '../../components/UI/Input';

class SharePlaceScreen extends React.Component {
    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
    }
    state = {
        placeName: '',
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

    placeNameChangedHandler = (placeName) => {
        this.setState(() => ({ placeName }));
    }

    handleAddPlace = () => {
        if (this.state.placeName.trim() !== '') {
            const place = {
                key: Math.random(),
                name: this.state.placeName,
                image: {
                    uri: 'https://images.pexels.com/photos/189349/pexels-photo-189349.jpeg?w=1260&h=750&dpr=2&auto=compress&cs=tinysrgb',
                },
            };
            this.props.addPlace(place);
            this.setState(() => ({ placeName: '' }));
        }
    };

    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <Heading1 text="Share a place!" />
                    <ImagePicker />
                    <LocationPicker />
                    <Input
                        placeHolder="Enter place name"
                        value={this.state.placeName}
                        onChangeText={this.placeNameChangedHandler}
                    />
                    <MainButton onPress={this.handleAddPlace}>Add Place</MainButton>
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
