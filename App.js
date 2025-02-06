import React from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Import authentication screens
import LoginScreen from './auth/LoginScreen';
import SignupScreen from './auth/SignupScreen';

// Import your projects here
import FirstProject from './projects/project1/firstproject';
import SecondProject from './projects/project2/secondproject';
import ThirdProject from './projects/project3/thirdproject';
import FourthProject from './projects/project4/fourthproject';
import FifthProject from './projects/project5/fifthproject';
import SixthProject from './projects/project6/sixthproject';
import SeventhProject from './projects/project7/seventhproject';
import EighthProject from './projects/project8/eighthproject';
import NinthProject from './projects/project9/ninthproject';

const Stack = createStackNavigator();

// Home Screen with Welcome Message and Project Navigation
function HomeScreen({ route, navigation }) {
  const userName = route.params.userName || 'User'; // Get username from params

  // Handle Logout
  const handleLogout = () => {
    Alert.alert('Success', 'Logged out successfully!', [
      {
        text: 'OK',
        onPress: () => navigation.navigate('Login'), // Navigate to Login screen after logout
      },
    ]);
  };

  return (
    <View style={styles.container}>
      {/* Welcome message at the top */}
      <Text style={styles.text}>Welcome, {userName}!</Text>

      {/* Project Selection */}
      <Text style={styles.title}>Select a Project:</Text>
      <View style={styles.buttonContainer}>
        <Button title="1. Basic Starter App" onPress={() => navigation.navigate('FirstProject')} />
        <Button title="2. My Student Profile" onPress={() => navigation.navigate('SecondProject')} />
        <Button title="3. Button Tutorial" onPress={() => navigation.navigate('ThirdProject')} />
        <Button title="4. Explore U.S. States" onPress={() => navigation.navigate('FourthProject')} />
        <Button title="5. Flexbox Playground" onPress={() => navigation.navigate('FifthProject')} />
        <Button title="6. CSU Logo Showcase" onPress={() => navigation.navigate('SixthProject')} />
        <Button title="7. Interactive Button Demo" onPress={() => navigation.navigate('SeventhProject')} />
        <Button title="8. Photo Sharing App" onPress={() => navigation.navigate('EighthProject')} />
        <Button title="9. Weather App" onPress={() => navigation.navigate('NinthProject')} />
      </View>

      {/* Logout button at the bottom */}
      <View style={styles.logoutContainer}>
        <Button title="Log Out" onPress={handleLogout} color="red" />
      </View>

    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="FirstProject" component={FirstProject} />
        <Stack.Screen name="SecondProject" component={SecondProject} />
        <Stack.Screen name="ThirdProject" component={ThirdProject} />
        <Stack.Screen name="FourthProject" component={FourthProject} />
        <Stack.Screen name="FifthProject" component={FifthProject} />
        <Stack.Screen name="SixthProject" component={SixthProject} />
        <Stack.Screen name="SeventhProject" component={SeventhProject} />
        <Stack.Screen name="EighthProject" component={EighthProject} />
        <Stack.Screen name="NinthProject" component={NinthProject} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  text: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 120,
    color: '#333',
    textAlign: 'center',
  },
  title: {
    fontSize: 22,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  buttonContainer: {
    alignItems: 'flex-start',
    width: '100%',
  },
  logoutContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 20,
  },
});

