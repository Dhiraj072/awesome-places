import React from 'react';
import { View } from 'react-native';
import ImagePreview from '../../components/ImagePreview/ImagePreview';
import MainButton from '../../components/UI/MainButton/MainButton';
import RNImagePicker from 'react-native-image-picker';

export default class ImagePicker extends React.Component {
    state = {
        pickedImage: null,
    };
    handleImagePick = () => {
        RNImagePicker.showImagePicker(
            {
                title: 'Pick an image',
            },
            (res) => {
                if (res.didCancel) {
                    // console.log('User cancelled');
                } else if (res.error) {
                    // TODO exception here?
                    // console.log('error', res.error);
                } else {
                    this.setState(() => ({
                        pickedImage: { uri: res.uri },
                    }));
                    this.props.onImagePicked({
                        uri: res.uri,
                        base64: res.data,
                    });
                }
            },
        );
    };
    render() {
        return (
            <View>
                <ImagePreview image={this.state.pickedImage} />
                <MainButton onPress={this.handleImagePick}>Pick Image</MainButton>
            </View>
        );
    }
}

