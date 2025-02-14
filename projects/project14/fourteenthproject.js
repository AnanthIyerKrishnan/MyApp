// Import necessary modules from React and React Native
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Define the main functional component
export default function App() {
  // State variable to store the current time
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  // useEffect hook to update the time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString()); // Updates time every second
    }, 1000);

    // Cleanup function to clear interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  return (
    // Main container with styling applied
    <View style={styles.container}>
      {/* Title of the app */}
      <Text style={styles.title}>Digital Clock :</Text>

      {/* Display the current time */}
      <Text style={styles.text}>{time}</Text>
    </View>
  );
}

// Define styles for the app
const styles = StyleSheet.create({
  container: { 
    flex: 1, // Takes up the full screen height
    justifyContent: 'center', // Centers content vertically
    alignItems: 'center', // Centers content horizontally
  },
  title: { 
    fontSize: 30, // Large font size for title
    fontWeight: 'bold', // Bold text
    marginBottom: 10, // Adds space below the title
  },
  text: { 
    fontSize: 40, // Bigger font for time display
    fontWeight: 'italic', // Italicize the time text
  },
});
