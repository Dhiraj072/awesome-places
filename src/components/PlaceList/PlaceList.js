import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import PlaceListItem from '../PlaceListItem/PlaceListItem';

export default (props) => (
    <FlatList
        style={styles.listContainer}
        data={props.places}
        renderItem={(info) => (
            <PlaceListItem
                name={info.item.name}
                onPlaceListItemPress={() => props.onPlaceListItemPress(info.item)}
                placeImage={info.item.image}
            />)}
    />
);

const styles = StyleSheet.create({
    listContainer: {
        width: '100%',
    },
});
