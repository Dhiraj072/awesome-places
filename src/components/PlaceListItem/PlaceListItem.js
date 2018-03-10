import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default (props) => (
    <TouchableOpacity onPress={props.onPlaceListItemPress}>
        <View style={styles.listItem}>
            <Text>{props.name}</Text>
        </View>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    listItem: {
        width: '100%',
        padding: 10,
        marginBottom: 5,
        backgroundColor: '#eee',
    },
});
