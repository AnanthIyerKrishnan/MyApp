import React, { useState, useEffect } from "react";
import { Text, View, SectionList, ActivityIndicator, Alert } from "react-native";

export default function StatesApp() {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);

  // Hardcoded GitHub raw file URL
  const githubUrl = "https://raw.githubusercontent.com/AnanthIyerKrishnan/CIS340/main/Cities.txt";

  useEffect(() => {
    const fetchFileFromGitHub = async () => {
      try {
        // Fetch file content from GitHub
        const response = await fetch(githubUrl);
        if (!response.ok) throw new Error("Failed to fetch file");

        const fileContent = await response.text(); // Get file content as text

        // Process file content
        let cityList = fileContent.split("\n").map(item => item.trim()).filter(item => item);
        cityList.sort((a, b) => a.localeCompare(b));

        // Group cities by their first letter
        const groupedCities = cityList.reduce((acc, city) => {
          const firstLetter = city[0].toUpperCase();
          if (!acc[firstLetter]) acc[firstLetter] = [];
          acc[firstLetter].push(city);
          return acc;
        }, {});

        // Convert grouped data into SectionList format
        const sectionedData = Object.keys(groupedCities).sort().map(letter => ({
          title: letter,
          data: groupedCities[letter],
        }));

        setSections(sectionedData);
      } catch (error) {
        console.error("Error fetching file:", error);
        Alert.alert("Error", "Could not fetch the file. Check the URL and try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchFileFromGitHub();
  }, []);

  return (
    <View style={{ flex: 1, paddingTop: 22, paddingHorizontal: 10 }}>
      {loading ? (
        <ActivityIndicator size="large" color="blue" />
      ) : (
        <SectionList
          sections={sections}
          renderItem={({ item }) => (
            <Text style={{ padding: 10, fontSize: 20 }}>{item}</Text>
          )}
          renderSectionHeader={({ section }) => (
            <Text style={{
              padding: 5, fontSize: 16, fontWeight: "bold",
              backgroundColor: "#9FA8DF", color: "white"
            }}>{section.title}</Text>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
    </View>
  );
}
