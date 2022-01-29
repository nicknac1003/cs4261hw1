import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


const firebaseConfig = {
apiKey: "AIzaSyDg-ctMzYb58VcFcip2GVT-EpCXXFCqJwg",
authDomain: "cs4261hw1-14187.firebaseapp.com",
databaseURL: "https://cs4261hw1-14187-default-rtdb.firebaseio.com",
projectId: "cs4261hw1-14187",
storageBucket: "cs4261hw1-14187.appspot.com",
messagingSenderId: "773237192004",
appId: "1:773237192004:ios:55037dd88674cf76955311"
};

let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig)
} else {
  app = firebase.app();
}

export { firebase };