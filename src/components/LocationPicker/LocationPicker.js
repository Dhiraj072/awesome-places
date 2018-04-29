import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import MapView from 'react-native-maps';
import MainButton from '../../components/UI/MainButton/MainButton';

export default class LocationPicker extends React.Component {
    componentWillMount() {
        this.reset();
    }
    setPickedLocation = (coordinates) => {
        this.setState(() => ({
            pickedLocation: {
                latitude: coordinates.latitude,
                longitude: coordinates.longitude,
            },
        }), () => {
            this.props.onLocationPick(this.state.pickedLocation);
        });
    };
    reset = () => {
        this.setState({
            region: {
                latitude: 37.795834,
                longitude: -122.406418,
                latitudeDelta: 0.0122,
                longitudeDelta:
                        (Dimensions.get('window').width /
                            Dimensions.get('window').height) * 0.0122,
            },
            pickedLocation: {
                latitude: '',
                longitude: '',
            },
        });
    };
    handleLocateMe = () => {
        navigator.geolocation.getCurrentPosition((pos) => {
            const lat = pos.coords.latitude;
            const lon = pos.coords.longitude;
            this.setPickedLocation({
                latitude: lat,
                longitude: lon,
            });
            this.map.animateToRegion({
                ...this.state.region,
                latitude: lat,
                longitude: lon,
            });
        }, () => {
            alert('Unable to get location. Check location settings');
        }, { timeout: 1000 });
    };
    handleLocationPick = (event) => {
        const coordinates = event.nativeEvent.coordinate;
        this.setPickedLocation(coordinates);
    };
    render() {
        let marker = null;
        if (this.state.pickedLocation.latitude !== '' &&
        this.state.pickedLocation.longitude !== '') {
            marker = <MapView.Marker coordinate={this.state.pickedLocation} />;
        }
        return (
            <View>
                <MapView
                    initialRegion={this.state.region}
                    style={styles.map}
                    onPress={this.handleLocationPick}
                    ref={(ref) => this.map = ref}
                >
                    {marker}
                </MapView>
                <MainButton onPress={this.handleLocateMe}>Locate Me</MainButton>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    map: {
        width: '100%',
        height: 200,
    },
});
