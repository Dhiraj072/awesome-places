import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default (props) => (
    <TouchableOpacity onPress={props.handleLogout}>
        <View style={styles.container}>
            <Icon
                name={props.icon}
                size={30}
                color="white"
                style={styles.icon}
            />
            <Text style={styles.text}>{props.text}</Text>
        </View>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    container: {
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        color: 'white',
        fontSize: 18,
    },
    icon: {
        marginRight: 10,
    },
});
