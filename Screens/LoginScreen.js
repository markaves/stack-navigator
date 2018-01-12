import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { StackNavigator, DrawerNavigator } from 'react-navigation';


import HomeScreen from './HomeScreen'

class  LoginScreen extends Component {
  render() {
    return (
      <View>
        <Text> This is a login Screen </Text>
        <Button onPress={()=> this.props.navigation.navigate('HomeScreen')} title="Go to Home Screen" />
      </View>
    );
  }
}

const LoginScreenStackNavigator = StackNavigator ({
    LoginScreen: { screen : LoginScreen },
    HomeScreen: { screen : HomeScreen  }
    
})

export default LoginScreenStackNavigator;