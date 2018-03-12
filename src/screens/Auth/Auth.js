import React from 'react';
import { Text, View, Button } from 'react-native';
import startTabs from '../MainTabs/startMainTabs';

class AuthScreen extends React.Component {
    handleLogin = () => {
        startTabs();
    }
    render() {
        return (
            <View>
                <Text>Auth screen</Text>
                <Button title="Login" onPress={this.handleLogin} />
            </View>
        );
    }
}

export default AuthScreen;
