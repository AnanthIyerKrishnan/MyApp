import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';

export default function App() {
  const [number, setNumber] = useState(1);

  return (
    <View style={styles.container}>
      {/* Dice Image */}
      <Image
        source={{ uri: 'https://raw.githubusercontent.com/AnanthIyerKrishnan/CIS340/master/images/dice.jpg' }}
        style={styles.diceImage}
      />

      {/* Dice Number */}
      <Text style={styles.text}>{number}</Text>

      {/* Roll Dice Button */}
      <Button title="Roll Dice" onPress={() => setNumber(Math.floor(Math.random() * 6) + 1)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 50, marginVertical: 20 },
  diceImage: { width: 100, height: 100, marginBottom: 20 }, // Adjust size as needed
});

