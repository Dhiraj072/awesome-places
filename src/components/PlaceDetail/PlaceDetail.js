import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default (props) => (
    <View style={styles.container}>
        <Image
            style={styles.image}
            source={props.place ? props.place.image : { uri: '' }}
        />
        <Text style={styles.text}>{props.place ? props.place.name : ''}</Text>
        <View>
            <View style={styles.button}>
                <Icon
                    size={30}
                    name="ios-trash"
                    color="red"
                    onPress={props.handleDeletePlace}
                />
            </View>
        </View>
    </View>
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
    button: {
        alignItems: 'center',
    },
});
