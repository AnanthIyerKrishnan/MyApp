// Import necessary modules from React and React Native
import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';

// Define the main functional component
export default function App() {
  // State variables
  const [result, setResult] = useState('Heads');
  const [countdown, setCountdown] = useState(null); // Holds countdown numbers
  const [buttonDisabled, setButtonDisabled] = useState(false); // Button state

  // Image URLs from GitHub
  const headsImage = 'https://raw.githubusercontent.com/AnanthIyerKrishnan/CIS340/main/images/heads.jpg';
  const tailsImage = 'https://raw.githubusercontent.com/AnanthIyerKrishnan/CIS340/main/images/tails.jpg';

  // Function to handle coin flip with faster countdown
  const flipCoin = () => {
    setCountdown(3); // Start countdown
    setButtonDisabled(true); // Disable the button

    let counter = 3;
    const interval = setInterval(() => {
      counter -= 1;
      setCountdown(counter);

      if (counter === 0) {
        clearInterval(interval); // Stop countdown

        // Set the final result (Heads or Tails)
        const newResult = Math.random() > 0.5 ? 'Heads' : 'Tails';
        setResult(newResult);
        setCountdown(null); // Remove countdown
        setButtonDisabled(false); // Enable button again
      }
    }, 500); // Faster countdown (0.5 seconds per step)
  };

  return (
    <View style={styles.container}>
      {/* Show result text when not counting down */}
      {countdown === null && <Text style={styles.resultText}>{result}</Text>}

      {/* Display countdown instead of the image when counting down */}
      {countdown !== null ? (
        <Text style={styles.countdown}>{countdown}</Text>
      ) : (
        <Image
          source={{ uri: result === 'Heads' ? headsImage : tailsImage }}
          style={styles.coin}
        />
      )}

      {/* Flip Coin Button (Disabled during countdown) */}
      <View style={styles.buttonContainer}>
        <Button title="Flip Coin" onPress={flipCoin} disabled={buttonDisabled} />
      </View>
    </View>
  );
}

// Define styles
const styles = StyleSheet.create({
  container: { 
    flex: 1,  
    justifyContent: 'center',  
    alignItems: 'center',  
    backgroundColor: '#f5f5f5',
  },
  resultText: { 
    fontSize: 30,  
    fontWeight: 'bold',
    marginBottom: 10,
  },
  countdown: { 
    fontSize: 50,  
    fontWeight: 'bold',
    color: '#ff0000',
  },
  buttonContainer: {
    marginTop: 20,
  },
  coin: {
    width: 100,
    height: 100,
    marginVertical: 10,
  },
});
