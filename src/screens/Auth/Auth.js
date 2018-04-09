import React from 'react';
import { connect } from 'react-redux';
import { View, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, StyleSheet, ImageBackground, Dimensions } from 'react-native';
import startTabs from '../MainTabs/startMainTabs';
import Input from '../../components/UI/Input';
import Heading1 from '../../components/UI/Heading1/Heading1';
import MainText from '../../components/UI/MainText/MainText';
import backgroundImage from '../../assets/background.jpg';
import MainButton from '../../components/UI/MainButton/MainButton';
import validate from '../../utility/validation';
import { tryAuth } from '../../store/actions/index';

class AuthScreen extends React.Component {
    state = {
        orientation: Dimensions.get('window').height > 500 ? 'portrait' : 'landscape',
        authMode: 'login',
        // Set valid to true for dev
        // TODO Set valid to false before release
        controls: {
            email: {
                value: '',
                valid: true,
                validationRules: {
                    isEmail: true,
                },
                touched: false,
            },
            password: {
                value: '',
                valid: true,
                validationRules: {
                    minLength: 6,
                },
                touched: false,
            },
            confirmPassword: {
                value: '',
                valid: true,
                validationRules: {
                    equalTo: 'password',
                },
                touched: false,
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
        const authData = {
            email: this.state.controls.email.value,
            password: this.state.controls.password.value,
        };
        startTabs();
    };

    handleToggleMode = () => {
        this.setState((state) => ({
            authMode: state.authMode === 'login' ? 'signup' : 'login',
        }));
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
                    touched: true,
                    valid: validate(value, state.controls[key].validationRules, connectedValue),
                },
            },
        }));
    }

    render() {
        let headingText;
        let confirmPasswordContent;
        if (this.state.authMode === 'signup') {
            confirmPasswordContent = (
                <Input
                    placeholder="Confirm Password"
                    value={this.state.controls.confirmPassword.value}
                    onChangeText={(val) => this.handleUpdateInput('confirmPassword', val)}
                    valid={this.state.controls.confirmPassword.valid}
                    touched={this.state.controls.confirmPassword.touched}
                    secureTextEntry
                />
            );
        }
        if (this.state.orientation === 'portrait') {
            headingText = (
                <MainText>
                    <Heading1 text="Awesome Places" />
                </MainText>
            );
        }
        const disabled = !this.state.controls.email.valid ||
            !this.state.controls.password.valid ||
            (!this.state.controls.confirmPassword.valid && this.state.authMode === 'signup');
        return (
            <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
                <KeyboardAvoidingView style={styles.container} behavior="padding">
                    {headingText}
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View
                            style={this.state.orientation === 'portrait' ?
                                styles.portraitInputContainer : styles.landscapeInputContainer}
                        >
                            <Input
                                placeholder="Email"
                                value={this.state.controls.email.value}
                                onChangeText={(val) => this.handleUpdateInput('email', val)}
                                valid={this.state.controls.email.valid}
                                touched={this.state.controls.email.touched}
                                autoCorrect={false}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                            <Input
                                placeholder="Password"
                                value={this.state.controls.password.value}
                                onChangeText={(val) => this.handleUpdateInput('password', val)}
                                valid={this.state.controls.password.valid}
                                touched={this.state.controls.password.touched}
                                secureTextEntry
                            />
                            { confirmPasswordContent }
                            <MainButton
                                onPress={this.handleToggleMode}
                            >
                            Switch to { this.state.authMode === 'login' ? 'Sign Up' : 'Login' }
                            </MainButton>
                            <MainButton
                                color="#ff4d4d"
                                onPress={this.handleLogin}
                                disabled={disabled}
                            >
                            Submit
                            </MainButton>
                        </View>
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
            </ImageBackground>

        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    onLogin: (authData) => dispatch(tryAuth(authData)),
});

export default connect(undefined, mapDispatchToProps)(AuthScreen);

const styles = StyleSheet.create({
    container: {
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
