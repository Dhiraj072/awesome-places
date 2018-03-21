import React from 'react';
import { TouchableNativeFeedback, TouchableOpacity, Text, View, StyleSheet, Platform } from 'react-native';

export default (props) => {
    const content = (
        <View style={styles.button}>
            <Text style={styles.text}>
                {props.children}
            </Text>
        </View>
    );
    if (Platform.OS === 'android') {
        return (
            <TouchableNativeFeedback onPress={props.onPress} >
                {content}
            </TouchableNativeFeedback>
        );
    }
    return (
        <TouchableOpacity onPress={props.onPress} >
            {content}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        padding: 10,
        margin: 5,
        backgroundColor: '#ff4d4d',
    },
    text: {
        color: 'white',
        textAlign: 'center',
    },
});
