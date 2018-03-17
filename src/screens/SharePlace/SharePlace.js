import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import AddPlaceForm from '../../components/AddPlaceForm/AddPlaceForm';
import { addPlace } from '../../store/actions/places';

class SharePlaceScreen extends React.Component {
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

    render() {
        return (
            <View>
                <AddPlaceForm
                    placeSubmitHandler={this.props.addPlace}
                />
            </View>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    addPlace: (place) => dispatch(addPlace(place)),
});

export default connect(undefined, mapDispatchToProps)(SharePlaceScreen);
