import React from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import PlaceList from '../../components/PlaceList/PlaceList';

class FindPlaceScreen extends React.Component {
    handleItemPress = (place) => {
        this.props.navigator.push({
            screen: 'awesome-places.PlaceDetailScreen',
            title: place.name,
            passProps: {
                place,
            },
        });
    };
    render() {
        return (
            <View>
                <PlaceList
                    places={this.props.places}
                    onPlaceListItemPress={this.handleItemPress}
                />
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    places: state.app.places,
});

export default connect(mapStateToProps)(FindPlaceScreen);
