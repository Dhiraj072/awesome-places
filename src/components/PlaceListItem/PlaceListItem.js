import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

export default (props) => (
    <TouchableOpacity onPress={props.onPlaceListItemPress}>
        <View style={styles.listItem}>
            <Image style={styles.image} source={props.placeImage} />
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
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        marginRight: 8,
        height: 30,
        width: 30,
    },
});
