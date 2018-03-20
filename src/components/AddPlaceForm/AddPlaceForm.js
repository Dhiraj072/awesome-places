import React from 'react';
import { View } from 'react-native';
import Input from '../../components/UI/Input';

export default class AddPlaceForm extends React.Component {
    state = {
        placeName: '',
    };

    placeNameChangedHandler = (val) => {
        this.setState({
            placeName: val,
        });
    };

    render() {
        return (
            <Input
                placeHolder="Enter place name"
                value={this.state.placeName}
                onChangeText={this.placeNameChangedHandler}
            />
        );
    }
}

