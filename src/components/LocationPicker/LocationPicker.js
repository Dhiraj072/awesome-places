import React from 'react';
import { View } from 'react-native';
import ImagePreview from '../../components/ImagePreview/ImagePreview';
import MainButton from '../../components/UI/MainButton/MainButton';
import placeImage from '../../assets/surfer.jpg';

export default class LocationPicker extends React.Component {
    handleLocationPick = () => {

    };
    render() {
        return (
            <View>
                <ImagePreview image={placeImage} />
                <MainButton onPress={this.handleLocationPick}>Pick Location</MainButton>
            </View>
        );
    }
}
