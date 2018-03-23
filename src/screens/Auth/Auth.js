import React from 'react';
import { View, StyleSheet, ImageBackground, Dimensions } from 'react-native';
import startTabs from '../MainTabs/startMainTabs';
import Input from '../../components/UI/Input';
import Heading1 from '../../components/UI/Heading1/Heading1';
import MainText from '../../components/UI/MainText/MainText';
import backgroundImage from '../../assets/background.jpg';
import MainButton from '../../components/UI/MainButton/MainButton';

class AuthScreen extends React.Component {   
    state = {
        orientation: Dimensions.get('window').height > 500 ? 'portrait' : 'landscape',
    };

    componentDidMount() {
        Dimensions.addEventListener('change', this.onDimensionsUpdate);
    }

    componentWillUnmount() {
        Dimensions.removeEventListener('change', this.onDimensionsUpdate);
    }

    onDimensionsUpdate = (dimensions) => {
        this.setState({ orientation: dimensions.window.height > 500 ? 'portrait' : 'landscape' });
    }

    handleLogin = () => {
        startTabs();
    };

    render() {
        let headingText;
        if (this.state.orientation === 'portrait') {
            headingText = (
                <MainText>
                    <Heading1 text="Awesome Places" />
                </MainText>
            );
        }
        return (
            <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
                <View style={styles.container}>
                    {headingText}
                    <View
                        style={this.state.orientation === 'portrait' ?
                            styles.portraitInputContainer : styles.landscapeInputContainer}
                    >
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
    landscapeInputContainer: {
        width: '50%',
    },
    portraitInputContainer: {
        width: '80%',
    },
    backgroundImage: {
        width: '100%',
        flex: 1,
    },
});
