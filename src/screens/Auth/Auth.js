import React from 'react';
import { View, StyleSheet, ImageBackground, Dimensions } from 'react-native';
import startTabs from '../MainTabs/startMainTabs';
import Input from '../../components/UI/Input';
import Heading1 from '../../components/UI/Heading1/Heading1';
import MainText from '../../components/UI/MainText/MainText';
import backgroundImage from '../../assets/background.jpg';
import MainButton from '../../components/UI/MainButton/MainButton';
import validate from '../../utility/validation';

class AuthScreen extends React.Component {
    state = {
        orientation: Dimensions.get('window').height > 500 ? 'portrait' : 'landscape',
        controls: {
            email: {
                value: '',
                valid: false,
                validationRules: {
                    isEmail: true,
                },
            },
            password: {
                value: '',
                valid: false,
                validationRules: {
                    minLength: 6,
                },
            },
            confirmPassword: {
                value: '',
                valid: false,
                validationRules: {
                    equalTo: 'password',
                },
            },
        },
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

    handleUpdateInput = (key, value) => {
        let connectedValue = {};
        // Set value of equalTo to the actual value of the field
        // i.e. set equalTo: "password" to
        // equalTo: actual password entered by user in confirm password
        if (this.state.controls[key].validationRules.equalTo) {
            const equalTo = this.state.controls[key].validationRules.equalTo;
            const equalToValue = this.state.controls[equalTo].value;
            connectedValue = {
                ...connectedValue,
                equalTo: equalToValue,
            };
        }
        this.setState((state) => ({
            controls: {
                ...state.controls,
                [key]: {
                    ...state.controls[key],
                    value,
                    valid: validate(value, state.controls[key].validationRules, connectedValue),
                },
            },
        }));
    }

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
                        <Input
                            placeholder="Email"
                            value={this.state.controls.email.value}
                            onChangeText={(val) => this.handleUpdateInput('email', val)}
                        />
                        <Input
                            placeholder="Password"
                            value={this.state.controls.password.value}
                            onChangeText={(val) => this.handleUpdateInput('password', val)}
                        />
                        <Input
                            placeholder="Confirm Password"
                            value={this.state.controls.confirmPassword.value}
                            onChangeText={(val) => this.handleUpdateInput('confirmPassword', val)}
                        />
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
