import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';

export default (props) => (
    <TouchableOpacity onPress={props.onPress}>
        <View style={styles.button}>
            <Text style={styles.text}>
                {props.children}
            </Text>
        </View>
    </TouchableOpacity>
);

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
