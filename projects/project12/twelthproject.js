// Import necessary modules from React and React Native
import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

// Define the main functional component
export default function App() {
  // State variable for managing task input
  const [task, setTask] = useState('');

  // State variable to store the list of tasks
  const [tasks, setTasks] = useState([]);

  // State variable to track if a task is being edited (stores index)
  const [editingIndex, setEditingIndex] = useState(null);

  // Function to add or update a task
  const handleTask = () => {
    if (task.trim()) { // Ensures the task is not empty
      if (editingIndex !== null) {
        // If a task is being edited, update it instead of adding a new one
        const updatedTasks = [...tasks];
        updatedTasks[editingIndex] = task; // Update the specific task
        setTasks(updatedTasks);
        setEditingIndex(null); // Reset editing state
      } else {
        // Add new task to the task list
        setTasks([...tasks, task]);
      }
      setTask(''); // Clear input field after adding or updating
    }
  };

  // Function to delete a task
  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index)); // Removes the task at the specified index
  };

  // Function to edit a task
  const editTask = (index) => {
    setTask(tasks[index]); // Set the selected task in the input field
    setEditingIndex(index); // Store the index of the task being edited
  };

  return (
    <View style={styles.container}>
      {/* Text Input for entering task */}
      <TextInput
        style={styles.input}
        placeholder="Enter task"
        value={task}
        onChangeText={setTask} // Updates task state when user types
      />

      {/* Button to add or update task */}
      <Button 
        title={editingIndex !== null ? "Update Task" : "Add Task"} 
        onPress={handleTask} 
      />

      {/* List of tasks using FlatList */}
      <FlatList
        data={tasks} // Data source for the list
        renderItem={({ item, index }) => (
          <View style={styles.taskContainer}>
            {/* Task item that can be tapped to edit */}
            <TouchableOpacity onPress={() => editTask(index)} style={styles.task}>
              <Text>{item}</Text>
            </TouchableOpacity>
            {/* Delete button for each task */}
            <Button title="X" onPress={() => deleteTask(index)} />
          </View>
        )}
        keyExtractor={(item, index) => index.toString()} // Unique key for each task
      />
    </View>
  );
}

// Define styles for the app
const styles = StyleSheet.create({
  container: { 
    flex: 1, // Takes up full height of screen
    padding: 20, // Adds padding around content
  },
  input: { 
    borderBottomWidth: 1, // Underline effect for input field
    marginBottom: 10, // Space below input field
    padding: 5, // Adds padding inside input field
  },
  taskContainer: { 
    flexDirection: 'row', // Aligns items horizontally
    alignItems: 'center', // Centers items vertically
    justifyContent: 'space-between', // Spaces out elements in the row
    marginVertical: 5, // Space between each task item
  },
  task: { 
    fontSize: 18, // Text size for tasks
    padding: 5, // Adds padding for better touch area
    flex: 1, // Allows text to take up remaining space
  },
});
