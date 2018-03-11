import React from 'react';
import { StyleSheet, Modal, View, Text, Button, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default (props) => (
    <Modal
        visible={props.place !== undefined}
        onRequestClose={props.handleModalClose}
        animationType="slide"
    >
        <View style={styles.modalContainer}>
            <Image
                style={styles.image}
                source={props.place ? props.place.image : { uri: '' }}
            />
            <Text style={styles.text}>{props.place ? props.place.name : ''}</Text>
            <View>
                <Button
                    title="Delete"
                    color="red"
                    onPress={props.handleDeletePlace}
                />
                {/* <Icon
                    name="ios-trash"
                    color="red"
                /> */}
                <Button
                    title="Close"
                    onPress={props.handleModalClose}
                />
            </View>
        </View>
    </Modal>
);

const styles = StyleSheet.create({
    modalContainer: {
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
