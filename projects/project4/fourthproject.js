import React, { useState } from "react";
import { Text, View, SectionList, TouchableOpacity } from 'react-native';
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";

export default StatesApp = () => {
  // State to store the sectioned country list
  const [sections, setSections] = useState([]);

  const pickDocument = async () => {
    try {
      // Open document picker to select a text file
      const result = await DocumentPicker.getDocumentAsync({
        type: "text/plain", // Allows only text files
      });

      if (result.canceled) return; // Exit if user cancels file selection
      
      const fileUri = result.assets[0].uri;
      // Read content of the selected file
      const fileContent = await FileSystem.readAsStringAsync(fileUri);
      
      // Split file content by new lines, trim whitespace, and remove empty entries
      let countryList = fileContent.split('\n').map(item => item.trim()).filter(item => item);
      // Sort the country list alphabetically
      countryList.sort((a, b) => a.localeCompare(b));
      
      // Group countries by their first letter
      const groupedCountries = countryList.reduce((acc, country) => {
        const firstLetter = country[0].toUpperCase(); // Extract first letter and convert to uppercase
        if (!acc[firstLetter]) {
          acc[firstLetter] = []; // Initialize array if not exists
        }
        acc[firstLetter].push(country); // Add country to the respective letter group
        return acc;
      }, {});
      
      // Convert grouped data into SectionList format
      const sectionedData = Object.keys(groupedCountries).sort().map(letter => ({
        title: letter,
        data: groupedCountries[letter],
      }));
      
      setSections(sectionedData); // Update state with the new sectioned data
    } catch (error) {
      console.error("Error picking document:", error);
    }
  };

  return (
    <View style={{ flex: 1, paddingTop: 22 }}>
      {/* Button to trigger file selection */}
      <TouchableOpacity
        onPress={pickDocument}
        style={{ backgroundColor: "blue", padding: 10, borderRadius: 5, marginBottom: 10 }}
      >
        <Text style={{ color: "white", textAlign: "center" }}>Upload Country List</Text>
      </TouchableOpacity>
      
      {/* Display sorted countries in a sectioned list */}
      <SectionList
        sections={sections} // Data source for SectionList
        renderItem={({ item }) => (
          <Text style={{ padding: 10, fontSize: 20, height: 44 }}>{item}</Text>
        )} // Render each country name
        renderSectionHeader={({ section }) => (
          <Text style={{
            paddingTop: 4, paddingLeft: 10,
            paddingRight: 10, paddingBottom: 4,
            fontSize: 14, fontWeight: 'bold',
            backgroundColor: '#9FA8DF',
          }}>{section.title}</Text> // Render section header with first letter
        )}
        keyExtractor={(item, index) => index.toString()} // Unique key for each item
      />
    </View>
  );
};
