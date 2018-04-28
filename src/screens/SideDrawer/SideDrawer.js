import React from 'react';
import { View, Dimensions, StyleSheet, Platform } from 'react-native';
import { connect } from 'react-redux';
import SideDrawerItem from '../../components/SideDrawerItem/SideDrawerItem';
import { logout } from '../../store/actions/index';

class SideDrawer extends React.Component {
    handleLogout = () => {
        console.log('handle logout');
        this.props.logout();
    };
    render() {
        return (
            <View style={[{ width: Dimensions.get('window').width * 0.8 }, styles.container]}>
                <SideDrawerItem
                    icon={Platform.OS === 'android' ? 'md-log-out' : 'ios-log-out'}
                    text="Logout"
                    onPress={this.handleLogout}
                />
            </View>
        );
    }
}

const mapDispatchToProps = (dispatch) =>({
    logout: () => dispatch(logout()),
});

export default connect(undefined, mapDispatchToProps)(SideDrawer);

const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
        paddingLeft: 20,
        backgroundColor: '#ff4d4d',
        flex: 1,
    },
});
