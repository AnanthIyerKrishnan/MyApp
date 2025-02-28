import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';

// Array containing meal data with title, background color, and menu items
const meals = [
  { title: 'Breakfast', color: '#FF6B6B', menu: 'Pancakes, Omelette, Juice' },
  { title: 'Lunch', color: '#4ECDC4', menu: 'Grilled Chicken, Salad, Rice' },
  { title: 'Dinner', color: '#1A535C', menu: 'Pasta, Steak, Vegetables' }
];

export default function App() {
  return (
    <View style={styles.container}>
      {/* Mapping through meals array to create interactive cards */}
      {meals.map((meal, index) => (
        <FlippableCard key={index} meal={meal} />
      ))}
    </View>
  );
}

const FlippableCard = ({ meal }) => {
  // State to track whether the card is flipped or not
  const [flipped, setFlipped] = useState(false);
  const rotateAnim = new Animated.Value(0);

  // Function to trigger the flip animation
  const flipCard = () => {
    Animated.timing(rotateAnim, {
      toValue: flipped ? 0 : 1,
      duration: 500,
      useNativeDriver: true
    }).start(() => setFlipped(!flipped));
  };

  // Interpolation for front and back card rotation
  const frontInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg']
  });
  const backInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['180deg', '360deg']
  });

  return (
    <TouchableOpacity onPress={flipCard}>
      {/* Front side of the card */}
      <Animated.View style={[styles.card, { backgroundColor: meal.color, transform: [{ rotateY: frontInterpolate }] }]}> 
        <Text style={styles.text}>{meal.title}</Text>
      </Animated.View>
      {/* Back side of the card, showing the menu */}
      <Animated.View style={[styles.card, styles.backCard, { transform: [{ rotateY: backInterpolate }] }]}> 
        <Text style={styles.text}>{meal.menu}</Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F7FFF7'
  },
  card: {
    width: 200,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    borderRadius: 10,
    backfaceVisibility: 'hidden'
  },
  backCard: {
    position: 'absolute',
    top: 0,
    backgroundColor: '#333'
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff'
  }
});
