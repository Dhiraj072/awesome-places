import React from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import startTabs from '../MainTabs/startMainTabs';
import Input from '../../components/UI/Input';
import Heading1 from '../../components/UI/Heading1/Heading1';
import MainText from '../../components/UI/MainText/MainText';
import backgroundImage from '../../assets/background.jpg';
import MainButton from '../../components/UI/MainButton/MainButton';

class AuthScreen extends React.Component {
    handleLogin = () => {
        startTabs();
    }
    render() {
        return (
            <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
                <View style={styles.container}>
                    <MainText>
                        <Heading1 text="Awesome Places" />
                    </MainText>
                    <View style={styles.inputContainer}>
                        <Input placeholder="Email" />
                        <Input placeholder="Password" />
                        <Input placeholder="Confirm Password" />
                        <MainButton onPress={this.handleLogin}>Sign up</MainButton>
                        <MainButton color="#ff4d4d" onPress={this.handleLogin}>Login</MainButton>
                    </View>
                </View>
            </ImageBackground>

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
    backgroundImage: {
        width: '100%',
        flex: 1,
    },
});
