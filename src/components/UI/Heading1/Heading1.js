import React from 'react';
import { Text, StyleSheet } from 'react-native';

export default (props) => (
    <Text style={styles.input}>
        {props.text}
    </Text>
);

const styles = StyleSheet.create({
    input: {
        fontSize: 28,
        fontWeight: 'bold',
        margin: 5,
    },
});
