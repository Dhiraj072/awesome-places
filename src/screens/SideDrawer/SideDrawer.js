import React from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import SideDrawerItem from '../../components/SideDrawerItem/SideDrawerItem';

class SideDrawer extends React.Component {
    handleLogout = () => {

    };
    render() {
        return (
            <View style={[{ width: Dimensions.get('window').width * 0.8 }, styles.container]}>
                <SideDrawerItem
                    icon="ios-log-out"
                    text="Logout"
                    onPress={this.handleLogout}
                />
            </View>
        );
    }
}

export default SideDrawer;

const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
        paddingLeft: 20,
        backgroundColor: '#ff4d4d',
        flex: 1,
    },
});
