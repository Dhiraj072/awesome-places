import React from 'react';
import { StyleSheet, View, Text, Image, ScrollView } from 'react-native';
import MainButton from '../UI/MainButton/MainButton';

export default (props) => (
    <ScrollView>
        <View style={styles.container}>
            <Image
                style={styles.image}
                source={props.place ? props.place.image : { uri: '' }}
            />
            <Text style={styles.text}>{props.place ? props.place.name : ''}</Text>
            <View>
                <MainButton onPress={props.handleDeletePlace}>Delete Place</MainButton>
            </View>
        </View>
    </ScrollView>
);


const styles = StyleSheet.create({
    container: {
        margin: 22,
    },
    image: {
        width: '100%',
        height: 200,
    },
    text: {
        fontWeight: 'bold',
        fontSize: 28,
        textAlign: 'center',
    },
});
