import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, TextInput,  
KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform, Button } from 'react-native';
import { firebase } from './config.js';


export default function App() {

  const [profile, setProfile] = React.useState({email: '', password:''});
  const [authSucc, setAuth] = React.useState(false);
  let handleSubmit = (e) => {
    console.log(profile);
    firebase
      .auth()
      .createUserWithEmailAndPassword(profile.email, profile.password)
      .then(()=>setAuth(true))
      .catch((err)=>alert(err))
      
  }


  return (
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          
            {
              (authSucc===false)?
              <View styles={styles.content}>
                <Text style={{fontSize: 40, alignSelf: 'center', marginBottom: 50}}>Register Account</Text>
                <TextInput
                style={styles.input}
                value={profile.email}
                onChangeText={(text)=>setProfile({...profile, email: text})}
                placeholder='email...'
                secureTextEntry={false}
                autoCapitalize='none'
                />
                <TextInput
                style={styles.input}
                value={profile.password}
                onChangeText={(text)=>setProfile({...profile, password: text})}
                secureTextEntry={true}
                placeholder='password...'
                />

                <Button title='Submit' onPress={handleSubmit}></Button>
              </View>
            :
            <Text>Account Created</Text>
            }
            
          
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    backgroundColor: '#fff',
    
  },
  logo: {
    width: 305,
    height: 159,
    marginBottom: 10,
    alignSelf: 'center',
  },
  instructions: {
    color: '#888',
    fontSize: 18,
    marginHorizontal: 15,
    textAlign: 'center',
  },
  button: {
    width: 200,
    backgroundColor: 'blue',
    padding: 20,
    borderRadius: 5,
    alignSelf: 'center',
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
  },
  thumbnail: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
  input: {
    height: 40,
    width: 300,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    alignSelf: 'center',
  },
});
