// Import necessary modules from React and React Native
import React, { useState } from 'react';
import {
    View, Text, TextInput, Button, StyleSheet,
    ScrollView, TouchableWithoutFeedback, Keyboard,
} from 'react-native';

// Define the main functional component
export default function App() {
    // State variables to store weight, height, BMI, and category classification
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [bmi, setBmi] = useState(null);
    const [category, setCategory] = useState('');

    // Function to calculate BMI when button is pressed
    const calculateBMI = () => {
        if (weight && height) {
            const heightInMeters = parseFloat(height) / 100; // Convert cm to meters
            const bmiValue = (parseFloat(weight) / (heightInMeters * heightInMeters)).toFixed(2); // BMI formula
            setBmi(bmiValue); // Update the BMI state
            classifyBMI(parseFloat(bmiValue)); // Call function to determine BMI category
        }
    };

    // Function to classify BMI based on its value
    const classifyBMI = (bmi) => {
        if (bmi < 18.5) {
            setCategory('Underweight');
        } else if (bmi >= 18.5 && bmi < 24.9) {
            setCategory('Normal weight');
        } else if (bmi >= 25 && bmi < 29.9) {
            setCategory('Overweight');
        } else {
            setCategory('Obese');
        }
    };

    return (
        // Dismiss keyboard when tapping outside input fields
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            {/* ScrollView allows for scrolling on small screens */}
            <ScrollView contentContainerStyle={styles.scrollView}>
                {/* App Title */}
                <Text style={styles.title}>BMI Calculator</Text>

                {/* Text input for weight */}
                <TextInput
                    style={styles.input}
                    placeholder="Weight (kg)"
                    keyboardType="numeric" // Numeric keyboard for better UX
                    onChangeText={setWeight} // Updates weight state
                />

                {/* Text input for height */}
                <TextInput
                    style={styles.input}
                    placeholder="Height (cm)"
                    keyboardType="numeric" // Numeric keyboard for better UX
                    onChangeText={setHeight} // Updates height state
                />

                {/* Button to trigger BMI calculation */}
                <View style={styles.buttonContainer}>
                    <Button title="Calculate BMI" onPress={calculateBMI} />
                </View>

                {/* Display results only when BMI is calculated */}
                {bmi && (
                    <View style={styles.resultContainer}>
                        <Text style={styles.text}>Your BMI: {bmi}</Text>
                        <Text style={styles.categoryText}>Category: {category}</Text>
                    </View>
                )}
            </ScrollView>
        </TouchableWithoutFeedback>
    );
}

// Define styles for the app
const styles = StyleSheet.create({
    container: {
        flex: 1, // Full screen height
        backgroundColor: '#fff', // White background
    },
    scrollView: {
        justifyContent: 'center', // Center content vertically
        alignItems: 'center', // Center content horizontally
        padding: 20, // Add padding
        flexGrow: 1, // Allows scrolling when needed
    },
    title: {
        fontSize: 26, // Large font size
        fontWeight: 'bold', // Bold text
        marginBottom: 30, // Space below title
    },
    input: {
        borderBottomWidth: 1, // Underline effect for inputs
        width: 250, // Input field width
        marginBottom: 20, // Space below each input
        textAlign: 'center', // Center text inside input
        fontSize: 18, // Text size
        paddingVertical: 5, // Padding inside input
    },
    buttonContainer: {
        marginTop: 20, // Space above button
        width: 200, // Button width
    },
    resultContainer: {
        marginTop: 30, // Space above result
        alignItems: 'center', // Center text
    },
    text: {
        fontSize: 22, // Larger text size for BMI result
        fontWeight: 'bold', // Bold text
        marginBottom: 5, // Space below
    },
    categoryText: {
        fontSize: 20, // Slightly smaller than BMI value
        color: 'blue', // Blue color for category text
        marginTop: 5, // Space above
    },
});
