//https://shellmonger.com/2017/05/15/authenticating-react-native-to-aws-cognito-user-pools/

import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator, DrawerNavigator } from 'react-navigation';


import { Container, Content, Header, Form, Input, Item, Button, Label } from 'native-base'


import HomeScreen from './HomeScreen'

class  LoginScreen extends Component {

 
  render() {
    return (
      <Container style={styles.container}>
      <Form>

      <Button style={{marginTop:10}}
        full
        rounded
        primary
        onPress={()=> this.loginWithFacebook()}
      >
      <Text style={{color: 'white'}}>Login With Facebook</Text>
      </Button>
      
      </Form>
      </Container>
    );
  }
}

const LoginScreenStackNavigator = StackNavigator ({
    LoginScreen: { screen : LoginScreen },
    HomeScreen: { screen : HomeScreen,
    navigationOptions: {
              title: 'Home Screen',
              headerLeft: null
            }
        }
    
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding:10,
    justifyContent: 'center',
  },
});

export default LoginScreenStackNavigator;