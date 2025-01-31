import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

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

// Home Screen with buttons to navigate
function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select a Project :</Text>
      <Button title="Go to First Project" onPress={() => navigation.navigate('FirstProject')} />
      <Button title="Go to Second Project" onPress={() => navigation.navigate('SecondProject')} />
      <Button title="Go to Third Project" onPress={() => navigation.navigate('ThirdProject')} />
      <Button title="Go to Fourth Project" onPress={() => navigation.navigate('FourthProject')} />
      <Button title="Go to Fifth Project" onPress={() => navigation.navigate('FifthProject')} />
      <Button title="Go to Sixth Project" onPress={() => navigation.navigate('SixthProject')} />
      <Button title="Go to Seventh Project" onPress={() => navigation.navigate('SeventhProject')} />
      <Button title="Go to Eighth Project" onPress={() => navigation.navigate('EighthProject')} />
      <Button title="Go to Ninth Project" onPress={() => navigation.navigate('NinthProject')} />
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
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
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
    fontWeight: 'bold',
  },
});
