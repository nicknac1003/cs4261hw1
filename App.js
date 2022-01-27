import React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, Button } from 'react-native';
import logo from './assets/logo.png';
import * as ImagePicker from 'expo-image-picker';
import * as Sharing from 'expo-sharing';
import uploadToAnonymousFilesAsync from 'anonymous-files';

export default function App() {
  const [selectedImage, setSelectedImage] = React.useState(null);
  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!")
      return
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    console.log(pickerResult);

    if (pickerResult.cancelled === true) {
      return;
    }
    if(Platform.OS ==='web') {
      console.log('awaiting uplaod');
      let remoteUri = await uploadToAnonymousFilesAsync(pickerResult.uri);
      setSelectedImage({localUri: pickerResult.uri, remoteUri});
      console.log('image uploaded');
    } else {
      setSelectedImage({localUri: pickerResult.uri, remoteUri: null});
    }
    
  };

  let openShareDialogAsync = async () => {
    if (!(await Sharing.isAvailableAsync())) {
      alert(`the image is available for sharing at ${selectedImage.remoteUri}`);
      return;
    }

    await Sharing.shareAsync(selectedImage.localUri).catch((err)=>console.log(err));
  };

  let clearImage = () => {
    setSelectedImage(null);
  }

  

  if (selectedImage !== null) {
    return (
      <View style={styles.container}>
        <Image
        source={{uri: selectedImage.localUri}}
        style={styles.thumbnail}
        />
        <TouchableOpacity 
        onPress={openShareDialogAsync}
        style={styles.button}
        >
          <Text style={styles.buttonText}>
            Share this photo
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
        onPress={clearImage}
        style={styles.button}
        >
          <Text style={styles.buttonText}>
            Clear Image
          </Text>
        </TouchableOpacity>
        <Button title='test button' style={{backgroundColor: 'red', padding: 10}}></Button>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <Text style={styles.instructions}>
        To share a photo from your phone with a friend, just press the button below!

      </Text>
      <TouchableOpacity
        onPress={openImagePickerAsync}
        style={styles.button}>
          <Text style={styles.buttonText}>
            Pick a photo
          </Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 305,
    height: 159,
    marginBottom: 10,
  },
  instructions: {
    color: '#888',
    fontSize: 18,
    marginHorizontal: 15,
    textAlign: 'center',
  },
  button: {
    backgroundColor: 'blue',
    padding: 20,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
  },
  thumbnail: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
});
