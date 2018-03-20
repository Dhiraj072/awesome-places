import React from 'react';
import { Text, StyleSheet } from 'react-native';

export default (props) => (
    <Text style={styles.text}>
        {props.children}
    </Text>
);

const styles = StyleSheet.create({
    text: {
        color: 'black',
    },
});
