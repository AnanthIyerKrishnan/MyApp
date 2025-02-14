import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker'; // Updated import
import * as Sharing from 'expo-sharing';

export default function App() {
  const [selectedImage, setSelectedImage] = useState(null);

  const openImagePickerAsync = async () => {
    // Request media library permissions
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      alert("Permission is required to access images!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true, // Optional: Crop before selection
      quality: 1, // High-quality image
    });

    if (pickerResult.canceled) {
      return;
    }

    setSelectedImage({ localUri: pickerResult.assets[0].uri });
  };

  const openSharingDialogAsync = async () => {
    if (!selectedImage) {
      alert("No image selected to share!");
      return;
    }

    if (!(await Sharing.isAvailableAsync())) {
      alert("Sharing is not available on this device.");
      return;
    }

    await Sharing.shareAsync(selectedImage.localUri);
  };

  return (
    <View style={styles.container}>
      {selectedImage ? (
        <>
          <Image source={{ uri: selectedImage.localUri }} style={styles.selImage} />
          <TouchableOpacity onPress={openSharingDialogAsync} style={styles.button}>
            <Text style={styles.buttonText}>Share This Photo</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Image
            source={{ uri: 'https://raw.githubusercontent.com/AnanthIyerKrishnan/CIS340/master/images/logo.png' }}
            style={styles.logo}
          />
          <Text style={styles.insts}>Press the button below to select an image from your phone!</Text>
          <TouchableOpacity style={styles.button} onPress={openImagePickerAsync}>
            <Text style={styles.buttonText}>Pick Image</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#FFFFE0",
  },
  button: {
    backgroundColor: "#778899",
    padding: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  insts: {
    fontSize: 18,
    color: "#87CEFA",
    marginHorizontal: 15,
    marginBottom: 10,
    textAlign: 'center',
  },
  logo: {
    width: 310,
    height: 300,
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 20,
    color: "#fff",
  },
  selImage: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
});
