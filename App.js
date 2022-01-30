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
  let handlePress = () => {
    Keyboard.dismiss();
    console.log('pressed');
  }


  return (
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <TouchableWithoutFeedback onPress={handlePress} style={{flex: 1, height: 500}}>
          
            {
              (authSucc===false)?
              <View styles={styles.content}>
                <Text style={styles.header}>Register Account</Text>
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
                <View style={{backgroundColor: 'white', marginTop: 12}}>
                  <Button title='Submit' onPress={handleSubmit}></Button>
                </View>
                
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
    //height: 1000000,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    padding: 24,
  },
  header: {
    fontSize: 40, 
    alignSelf: 'center', 
    marginBottom: 50,
  },
  input: {
    height: 40,
    width: 300,
    margin: 12,
    borderBottomWidth: 1,
    padding: 10,
    alignSelf: 'center',
    marginBottom: 36,
  },
});
