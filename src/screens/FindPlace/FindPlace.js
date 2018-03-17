import React from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import PlaceList from '../../components/PlaceList/PlaceList';

class FindPlaceScreen extends React.Component {
    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
    }

    onNavigatorEvent = (event) => {
        if (event.type === 'NavBarButtonPress') {
            if (event.id === 'sideDrawer') {
                this.props.navigator.toggleDrawer({
                    side: 'left',
                });
            }
        }
    }

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
