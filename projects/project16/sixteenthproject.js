// Import necessary modules from React and React Native
import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

// Define the main functional component
export default function App() {
  // Define a state variable `result` to store the coin flip result
  // Initial value is set to 'Heads'
  const [result, setResult] = useState('Heads');

  return (
    // Main container with styling applied
    <View style={styles.container}>
      {/* Display the current result (Heads or Tails) */}
      <Text style={styles.text}>{result}</Text>

      {/* Button that flips the coin when pressed */}
      <Button 
        title="Flip Coin" 
        onPress={() => setResult(Math.random() > 0.5 ? 'Heads' : 'Tails')} 
      />
    </View>
  );
}

// Define styles for the app
const styles = StyleSheet.create({
  container: { 
    flex: 1,  // Takes up the full height of the screen
    justifyContent: 'center',  // Centers content vertically
    alignItems: 'center',  // Centers content horizontally
  },
  text: { 
    fontSize: 30,  // Sets text size to 30
    marginBottom: 20,  // Adds space below the text
  },
});
