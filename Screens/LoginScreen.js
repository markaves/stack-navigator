//https://shellmonger.com/2017/05/15/authenticating-react-native-to-aws-cognito-user-pools/

import React, { Component } from 'react';
import { ScrollView, Text, TextInput, View, Button, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { StackNavigator, DrawerNavigator } from 'react-navigation';

import { login } from '../redux/actions/auth';
import { AuthenticationDetails } from '../lib/aws-cognito-identity/AuthenticationDetails';
import { CognitoUser } from '../lib/aws-cognito-identity/CognitoUser';
import { CognitoUserAttribute  } from '../lib/aws-cognito-identity/CognitoUser';
import { CognitoUserPool } from '../lib/aws-cognito-identity/CognitoUser';


const awsCognitoSettings = {
    UserPoolId: 'ap-southeast-1_0Gok6yWPc',
    ClientId: '6ahu1l0262utr3m9r3c2enosn4'
};


import HomeScreen from './HomeScreen'

class  LoginScreen extends Component {
    constructor (props) {
        super(props);
        this.state = {
            page: 'Login',
            username: '',
            password: ''
        };
    }

    get alt () { return (this.state.page === 'Login') ? 'SignUp' : 'Login'; }

    handleClick (e) {
    e.preventDefault();
    const userPool = new CognitoUserPool(awsCognitoSettings);
 
    // Sign up
    if (this.state.page === 'SignUp') {
        const attributeList = [
            new CognitoUserAttribute({ Name: 'email', Value: this.state.userame })
        ];
        userPool.signUp(
            this.state.username,
            this.state.password,
            attributeList,
            null,
            (err, result) => {
                if (err) {
                    alert(err);
                    this.setState({ username: '', password: '' });
                    return;
                }
                console.log(`result = ${JSON.stringify(result)}`);
                alert('Sign Up Successful.  Check your Email for a verification');
                this.setState({ page: 'Login' });
            }
        );
    } else {
        const authDetails = new AuthenticationDetails({
            Username: this.state.username,
            Password: this.state.password
        });
        const cognitoUser = new CognitoUser({
            Username: this.state.username,
            Pool: userPool
        });
        cognitoUser.authenticateUser(authDetails, {
            onSuccess: (result) => {
                console.log(`access token = ${result.getAccessToken().getJwtToken()}`);
                this.props.onLogin(this.state.username, this.state.password);
            },
            onFailure: (err) => {
                alert(err);
                this.setState({ username: '', password: '' });
                return;
            }
        });
    }
  }

    togglePage (e) {
        this.setState({ page: this.alt });
        e.preventDefault();
    }
 
 render() {
    return (
        <ScrollView style={{padding: 20}}>
            <Text style={{fontSize: 27}}>{this.state.page}</Text>
            <TextInput 
                placeholder='Email Address'
                autoCapitalize='none'
                autoCorrect={false} 
                autoFocus={true} 
                keyboardType='email-address'
                value={this.state.username} 
                onChangeText={(text) => this.setState({ username: text })} />
            <TextInput 
                placeholder='Password'
                autoCapitalize='none'
                autoCorrect={false} 
                secureTextEntry={true} 
                value={this.state.password} 
                onChangeText={(text) => this.setState({ password: text })} />
            <View style={{margin: 7}}/>
            <Button onPress={(e) => this.handleClick(e)} title={this.state.page}/>
            <View style={{margin: 7, flexDirection: 'row', justifyContent: 'center'}}>
                <Text onPress={(e) => this.togglePage(e)} style={{fontSize: 12, color: 'blue'}}>
                    {this.alt}
                </Text>
            </View>
        </ScrollView>
    );
}}

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