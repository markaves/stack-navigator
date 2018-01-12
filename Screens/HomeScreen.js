import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TabNavigator } from 'react-navigation';


class  HomeScreen extends Component {
  render() {
    return (
      <View>
        <Text> This is a HomeScreen </Text>
      </View>
    );
  }
}

class  Notifications extends Component {
  render() {
    return (
      <View>
        <Text> This is a Notifications </Text>
      </View>
    );
  }
}

const HomeScreenTabNavigator = TabNavigator({
    HomeScreen: { screen: HomeScreen},
    Notifications: { screen: Notifications}
    },
    {
        animationEnabled: true,
        tabBarOptions: {
            activeTintColor: '#e91e63'
        }
    }    
    )

export default HomeScreenTabNavigator