import React from 'react';
import { StyleSheet, View, Text, Image, ScrollView, Dimensions } from 'react-native';
import MainButton from '../UI/MainButton/MainButton';

export default class extends React.Component {
    state = {
        orientation: Dimensions.get('window').height > 500 ? 'portrait' : 'landscape',
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
                    <Text style={styles.text}>{this.props.place ? this.props.place.name : ''}</Text>
                    <MainButton onPress={this.props.handleDeletePlace}>Delete Place</MainButton>
                </View>
            );
        }

        return (
            <ScrollView>
                <View style={styles.container}>
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
        margin: 22,
    },
    image: {
        width: '100%',
        height: 200,
    },
    text: {
        fontWeight: 'bold',
        fontSize: 28,
        textAlign: 'center',
    },
});
