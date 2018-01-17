import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator, DrawerNavigator } from 'react-navigation';

import * as firebase from 'firebase';
import { Container, Content, Header, Form, Input, Item, Button, Label } from 'native-base'

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDuHfXwrq5g3QrSXk1u6GKGbG212SliCd0",
    authDomain: "react-firebase-2d457.firebaseapp.com",
    databaseURL: "https://react-firebase-2d457.firebaseio.com",
    projectId: "react-firebase-2d457",
    storageBucket: "",
};

firebase.initializeApp(firebaseConfig);

import HomeScreen from './HomeScreen'

class  LoginScreen extends Component {
  constructor(props) {
    super(props)
    
    this.state =({
      email: '',
      password: ''
    })
  }
  
  componentDidMount(){
    firebase.auth().onAuthStateChanged((user)=>{
      if (user != null) {
        console.log(user)
      }
    })
  }
  
  signUpUser = (email,password) => {
    try{
     if (this.state.password.length < 6) {
       alert("Please enter atleast 6 characters")
       return;
     } 
     firebase.auth().createUserWithEmailAndPassword(email,password).catch(function(error) {
    // Handle Errors here.
    //var errorCode = error.code;
    //var errorMessage = error.message;
    
    alert(error.message)
    console.log(error)
    // ...
});
     
    }
    catch (error) {
      console.log(error.toString())
    }
  }  
  
  loginUser = (email, password) => {
    const { navigate } = this.props.navigation
    try{
      if (this.state.email.length > 0) {
        firebase.auth().signInWithEmailAndPassword(email,password).then(function (user) {
       console.log(user)
       navigate('HomeScreen')
     })
      }
    }
    catch (error) {
      console.log(error.toString())
    }
  }
  
  async loginWithFacebook(){
    const {type,token} = await Expo.Facebook.logInWithReadPermissionsAsync
    ('283618032166078',{permissions: ['public_profile']})
    if (type == 'success'){
      const credential = firebase.auth.FaceBookAuthProvider.credential(token)
      firebase.auth().signInWithCredential(credential).catch((error) => {
        console.log(error) 
      })
    }
  }
  
  render() {
    return (
      <Container style={styles.container}>
      <Form>
      <Item>
      <Label>Email</Label>
      <Input
        autoCorrect={false}
        autoCapitalize="none"
        onChangeText={(email) => this.setState({email})}
      />
      </Item>
      <Item>
      <Label>Password</Label>
      <Input
        secureTextEntery={true}
        autoCorrect={false}
        autoCapitalize="none"
        onChangeText={(password) => this.setState({password})}
      />
      </Item>
      
      <Button style={{marginTop:10}}
        full
        rounded
        success
        onPress={()=> this.loginUser(this.state.email, this.state.password)}
        >
      <Text style={{color: 'white'}}>Login</Text>
      </Button>
      <Button style={{marginTop:10}}
        full
        rounded
        primary
        onPress={()=> this.signUpUser(this.state.email, this.state.password)}
      >
      <Text style={{color: 'white'}}>Signup</Text>
      </Button>
      
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