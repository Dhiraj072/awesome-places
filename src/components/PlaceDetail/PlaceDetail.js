import React from 'react';
import { StyleSheet, View, Text, Image, ScrollView, Dimensions } from 'react-native';
import MapView from 'react-native-maps';
import MainButton from '../UI/MainButton/MainButton';

export default class extends React.Component {
    state = {
        orientation: Dimensions.get('window').height > 500 ? 'portrait' : 'landscape',
        region: {
            latitude: this.props.place.location.latitude,
            longitude: this.props.place.location.longitude,
            latitudeDelta: 0.0122,
            longitudeDelta: (Dimensions.get('window').width /
                Dimensions.get('window').height) * 0.0122,
        },
    };

    componentDidMount() {
        Dimensions.addEventListener('change', this.onDimensionsUpdate);
    }

    componentWillUnmount() {
        Dimensions.removeEventListener('change', this.onDimensionsUpdate);
    }

    onDimensionsUpdate = (dimensions) => {
        this.setState({ orientation: dimensions.window.height > 500 ? 'portrait' : 'landscape' });
    }

    render() {
        let content;
        if (this.state.orientation === 'portrait') {
            content = (
                <View>
                    <MapView
                        initialRegion={this.state.region}
                        style={styles.map}
                    >
                        <MapView.Marker coordinate={this.props.place.location} />
                    </MapView>
                    <View style={styles.container}>
                        <MainButton onPress={this.props.handleDeletePlace}>Delete Place</MainButton>
                    </View>
                </View>
            );
        }
        
        return (
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.text}>{this.props.place ? this.props.place.name : ''}</Text>
                    <Image
                        style={styles.image}
                        source={this.props.place ? this.props.place.image : { uri: '' }}
                    />
                    { content }
                </View>
            </ScrollView>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        margin: 10,
    },
    image: {
        width: '100%',
        height: 200,
        margin: 5,
    },
    text: {
        fontWeight: 'bold',
        fontSize: 28,
        textAlign: 'center',
    },
    map: {
        width: '100%',
        height: 200,
        margin: 5,
    },
});
