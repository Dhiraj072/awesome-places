import React from 'react';
import { View } from 'react-native';
import ImagePreview from '../../components/ImagePreview/ImagePreview';
import MainButton from '../../components/UI/MainButton/MainButton';
import placeImage from '../../assets/surfer.jpg';

export default class ImagePicker extends React.Component {
    handleImagePick = () => {

    };
    render() {
        return (
            <View>
                <ImagePreview image={placeImage} />
                <MainButton onPress={this.handleImagePick}>Pick Image</MainButton>
            </View>
        );
    }
}

