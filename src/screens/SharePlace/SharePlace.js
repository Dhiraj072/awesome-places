import React from 'react';
import { View, KeyboardAvoidingView, ScrollView, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import ImagePicker from '../../components/ImagePicker/ImagePicker';
import LocationPicker from '../../components/LocationPicker/LocationPicker';
import { addPlace } from '../../store/actions/places';
import MainButton from '../../components/UI/MainButton/MainButton';
import Input from '../../components/UI/Input';
import validate from '../../utility/validation';

class SharePlaceScreen extends React.Component {
    static navigatorStyle = {
        navBarButtonColor: '#ff4d4d',
    }

    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
    }

    componentWillMount() {
        this.setInitialState();
    }

    onNavigatorEvent = (event) => {
        if (event.type === 'NavBarButtonPress') {
            if (event.id === 'sideDrawer') {
                this.props.navigator.toggleDrawer({
                    side: 'left',
                });
            }
        }
    };

    setInitialState = () => {
        this.setState({
            placeName: {
                value: '',
                valid: false,
                validationRules: {
                    notEmpty: true,
                },
                touched: false,
            },
            placeLocation: {
                value: null,
                valid: false,
            },
            placeImage: {
                value: null,
                valid: false,
            },
        });
    };

    placeNameChangedHandler = (placeName) => {
        this.setState((state) => ({
            placeName: {
                ...state.placeName,
                value: placeName,
                touched: true,
                valid: validate(placeName, state.placeName.validationRules),
            },
        }));
    }

    handleAddPlace = () => {
        if (this.state.placeName.value.trim() !== '') {
            const place = {
                key: Math.random(),
                name: this.state.placeName.value,
                image: this.state.placeImage.value,
                location: this.state.placeLocation.value,
            };
            this.props.addPlace(place)
                .then(() => {
                    this.setInitialState();
                    this.imagePicker.reset();
                    this.locationPicker.reset();
                    this.props.navigator.switchToTab({ tabIndex: 0 });
                });
        }
    };

    handleLocationPick = (location) => {
        this.setState(() => ({
            placeLocation: {
                value: location,
                valid: true,
            },
        }));
    }

    handleImagePick = (image) => {
        this.setState((state) => ({
            ...state,
            placeImage: {
                value: image,
                valid: true,
            },
        }));
    }

    render() {
        let submitButtonText = 'Add Place';
        // TODO Use an activity indicator modal here
        if (this.props.isLoading) {
            submitButtonText = 'Adding Place ...';
        }
        return (
            <ScrollView>
                <KeyboardAvoidingView style={styles.container} behavior="padding">
                    <View>
                        <ImagePicker
                            onImagePicked={this.handleImagePick}
                            ref={(ref) => (this.imagePicker = ref)}
                        />
                        <LocationPicker
                            onLocationPick={this.handleLocationPick}
                            ref={(ref) => (this.locationPicker = ref)}

                        />
                        <Input
                            placeHolder="Enter place name"
                            value={this.state.placeName.value}
                            onChangeText={this.placeNameChangedHandler}
                        />
                        <MainButton
                            onPress={this.handleAddPlace}
                            disabled={!this.state.placeName.valid ||
                                      !this.state.placeLocation.valid}
                        >
                            { submitButtonText }
                        </MainButton>
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
        );
    }
}

const mapStateToProps = (state) => ({
    isLoading: state.ui.isLoading,
});

const mapDispatchToProps = (dispatch) => ({
    addPlace: (place) => dispatch(addPlace(place)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SharePlaceScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
