import React from 'react';
import { Image, View, StyleSheet } from 'react-native';

export default (props) => (
    <View style={styles.container}>
        <Image source={props.image} style={styles.image} />
    </View>
);

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        width: '100%',
        height: 150,
    },
    image: {
        width: '100%',
        height: '100%',
    },
});
