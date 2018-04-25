import React from 'react';
import { connect } from 'react-redux';
import { View, Animated } from 'react-native';
import PlaceList from '../../components/PlaceList/PlaceList';
import MainButton from '../../components/UI/MainButton/MainButton';
import { getPlaces } from '../../store/actions/places';

class FindPlaceScreen extends React.Component {
    static navigatorStyle = {
        navBarButtonColor: '#ff4d4d',
    }

    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
    }

    state = {
        searchComplete: false,
        zoomAndFadeOutAnim: new Animated.Value(1),
        fadeInAnim: new Animated.Value(0),
    };

    componentDidMount() {
        this.props.getPlaces();
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

    handlePlaceSearchComplete = () => {
        Animated.timing(this.state.fadeInAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start();
    };

    handlePlaceSearch = () => {
        Animated.timing(this.state.zoomAndFadeOutAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
        }).start(() => {
            this.setState({
                searchComplete: true,
            });
            this.handlePlaceSearchComplete();
        });
    };

    render() {
        let content = (
            <Animated.View style={{
                // Set this to change opacity from 1 to 0
                opacity: this.state.zoomAndFadeOutAnim,
                transform: [
                    {
                        scale: this.state.zoomAndFadeOutAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: [12, 1],
                        }),
                    },
                ],
            }}
            >
                <MainButton onPress={this.handlePlaceSearch}>
                    Search places
                </MainButton>
            </Animated.View>
        );

        if (this.state.searchComplete) {
            content = (
                <Animated.View style={{ opacity: this.state.fadeInAnim }}>
                    <PlaceList
                        places={this.props.places}
                        onPlaceListItemPress={this.handleItemPress}
                    />
                </Animated.View>
            );
        }
        return (
            <View>
                {content}
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    places: state.app.places,
});

const mapDispatchToProps = (dispatch) => ({
    getPlaces: () => dispatch(getPlaces()),
});

export default connect(mapStateToProps, mapDispatchToProps)(FindPlaceScreen);
