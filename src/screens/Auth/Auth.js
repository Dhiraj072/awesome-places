import React from 'react';
import { Text, TextInput, View, Button, StyleSheet } from 'react-native';
import startTabs from '../MainTabs/startMainTabs';
import Input from '../../components/UI/Input';

class AuthScreen extends React.Component {
    handleLogin = () => {
        startTabs();
    }
    render() {
        return (
            <View style={styles.container}>
                <Text>Awesome Places</Text>
                <Button title="Login" onPress={this.handleLogin} />
                <View style={styles.inputContainer}>
                    <Input placeholder="Email" />
                    <Input placeholder="Password" />
                    <Input placeholder="Confirm Password" />
                </View>
                <Button title="Sign up" onPress={this.handleLogin} />
            </View>
        );
    }
}

export default AuthScreen;

const styles = StyleSheet.create({
    container: {
        borderColor: 'red',
        borderWidth: 1,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputContainer: {
        width: '80%',
    },
});
