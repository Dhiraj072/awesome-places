import React from 'react';
import { StyleSheet, TextInput, Button, View } from 'react-native';

export default class AddPlaceForm extends React.Component {
    state = {
        placeName: '',
    };

    placeNameChangedHandler = (val) => {
        this.setState({
            placeName: val,
        });
    };

    placeSubmitHandler = () => {
        if (this.state.placeName.trim() === '') {
            return;
        }
        this.props.placeSubmitHandler(this.state.placeName);
        this.setState(() => ({ placeName: '' }));
    };

    render() {
        return (
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={this.state.placeName}
                    placeholder="Your awesome place"
                    onChangeText={this.placeNameChangedHandler}
                />
                <Button
                    style={styles.button}
                    title="Add"
                    onPress={this.placeSubmitHandler}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    input: {
        width: '70%',
    },
    button: {
        width: '30%',
    },
});
