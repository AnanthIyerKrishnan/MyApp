import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import Constants from 'expo-constants';

// Complete authentication session
WebBrowser.maybeCompleteAuthSession();

// Retrieve Auth0 credentials from app.json
const auth0Domain = Constants.expoConfig.extra.auth0Domain;
const auth0ClientId = Constants.expoConfig.extra.auth0ClientId;

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Create Auth0 authentication request
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: auth0ClientId,
      redirectUri: makeRedirectUri({ scheme: 'myapp' }), // Must match app.json scheme
      responseType: 'token',
      scopes: ['openid', 'profile', 'email'],
    },
    { authorizationEndpoint: `https://${auth0Domain}/authorize` }
  );

  // Handle Auth0 response
  useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      handleAuth0Login(authentication.accessToken);
    }
  }, [response]);

  // Fetch user details from Auth0
  const handleAuth0Login = async (accessToken) => {
    try {
      const userInfoResponse = await fetch(`https://${auth0Domain}/userinfo`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const userInfo = await userInfoResponse.json();

      // Store user info in AsyncStorage
      await AsyncStorage.setItem('user', JSON.stringify(userInfo));

      Alert.alert('Success', 'Logged in with Auth0!');
      navigation.navigate('Home', { userName: userInfo.name || 'User' });
    } catch (error) {
      Alert.alert('Error', 'Auth0 Login failed');
    }
  };

  // Traditional local login (for AsyncStorage users)
  const handleLocalLogin = async () => {
    try {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        const { email: storedEmail, password: storedPassword, name: storedName } = JSON.parse(storedUser);
        if (email === storedEmail && password === storedPassword) {
          Alert.alert('Success', 'Logged in successfully!', [
            { text: 'OK', onPress: () => navigation.navigate('Home', { userName: storedName }) },
          ]);
        } else {
          Alert.alert('Error', 'Invalid email or password');
        }
      } else {
        Alert.alert('Error', 'No user found. Please sign up first.');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Enter your email"
        placeholderTextColor="#aaa"
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholder="Enter your password"
        placeholderTextColor="#aaa"
      />
      <Button title="Login" onPress={handleLocalLogin} />
      <Button title="Login with Auth0" onPress={() => promptAsync()} color="green" disabled={!request} />
      <Button title="New User? Sign Up" onPress={() => navigation.navigate('Signup')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    marginBottom: 16,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
});

export default LoginScreen;
