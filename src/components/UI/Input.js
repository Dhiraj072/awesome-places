import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

export default (props) => (
    <TextInput
        underlineColorAndroid="transparent"
        placeholderTextColor="#bdc3c7"
        {...props}
        style={[styles.input, props.style]} // Pass in styles prop to override styles here
    />
);

const styles = StyleSheet.create({
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#eee',
        padding: 5,
        marginTop: 5,
        marginBottom: 5,
        color: 'white',
    },
});
