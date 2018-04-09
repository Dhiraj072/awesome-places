import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import MapView from 'react-native-maps';
import MainButton from '../../components/UI/MainButton/MainButton';

export default class LocationPicker extends React.Component {
    state = {
        initialRegion: {
            latitude: 37.790052,
            longitude: -122.4013706,
            latitudeDelta: 0.0122,
            longitudeDelta:
                (Dimensions.get('window').width / 
                Dimensions.get('window').height) * 0.0122,
        },
        pickedLocation: {
            latitude: '',
            longitude: '',
        },
    }
    handleLocationPick = (event) => {
        const coordinates = event.nativeEvent.coordinate;
        this.setState((state) => ({
            pickedLocation: {
                latitude: coordinates.latitude,
                longitude: coordinates.longitude,
            },
        }));
    };
    render() {
        let marker = null;
        if (this.state.pickedLocation.latitude !== '' &&
        this.state.pickedLocation.longitude !== '') {
            marker = <MapView.Marker coordinate={this.state.pickedLocation} />
        };
        return (
            <View>
                <MapView
                    initialRegion={this.state.initialRegion}
                    style={styles.map}
                    onPress={this.handleLocationPick}
                >
                    {marker}
                </MapView>
                <MainButton onPress={this.handleLocationPick}>Pick Location</MainButton>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    map: {
        width: '100%',
        height: 250,
    },
});
