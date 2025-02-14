// Import necessary modules from React and React Native
import React, { useState } from 'react';
import { View, Button, StyleSheet } from 'react-native';

// Define the main functional component
export default function App() {
  // Define a state variable `bgColor` to store the background color
  // Initial color is set to white ('#fff')
  const [bgColor, setBgColor] = useState('#fff');

  return (
    // View component that covers the whole screen
    // The background color is dynamically set based on `bgColor` state
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      {/* Button that changes the background color when pressed */}
      <Button 
        title="Change Color" 
        onPress={() => 
          setBgColor(`#${Math.floor(Math.random() * 16777215).toString(16)}`) // Generates a random hex color
        } 
      />
    </View>
  );
}

// Define styles for the app
const styles = StyleSheet.create({
  container: { 
    flex: 1,  // Takes the full height of the screen
    justifyContent: 'center',  // Centers content vertically
    alignItems: 'center',  // Centers content horizontally
  },
});
