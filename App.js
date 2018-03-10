import React from 'react';
import { StyleSheet, View } from 'react-native';
import AddPlaceForm from './src/components/AddPlaceForm/AddPlaceForm';
import PlaceList from './src/components/PlaceList/PlaceList';

export default class App extends React.Component {
    state = {
        places: [],
    };

  placeSubmitHandler = (placeName) => {
      this.setState((state) => ({
          places: state.places.concat({ key: Math.random(), name: placeName }),
      }));
  };

  placeDeletedHandler = (key) => {
      this.setState((state) => ({
          places: state.places.filter((place) => place.key !== key),
      }));
  }

  render() {
      return (
          <View style={styles.container}>
              <AddPlaceForm
                  placeNameChangedHandler={this.placeNameChangedHandler}
                  placeSubmitHandler={this.placeSubmitHandler}
              />
              <PlaceList
                  places={this.state.places}
                  onPlaceListItemPress={this.placeDeletedHandler}
              />
          </View>
      );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 26,
    },
});
