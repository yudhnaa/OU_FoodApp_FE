import {initializeApp} from 'firebase/app';
import {
    getAuth,
    GoogleAuthProvider,
    signInWithCredential,
    getReactNativePersistence,
    initializeAuth
} from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyBncQRo6l-_n9fw2oQJ2zvC6v19WNX9_rI",
    authDomain: "foodappou-c38a2.firebaseapp.com",
    databaseURL: "https://foodappou-c38a2.firebaseio.com",
    projectId: "foodappou-c38a2",
    storageBucket: "foodappou-c38a2.firebasestorage.app",
    messagingSenderId: "986206586435",
    appId: "1:986206586435:ios:ca680c74349a69ccde76f6",
    measurementId: "G-MEASUREMENT_ID",
};

// initialize Firebase App
const app = initializeApp(firebaseConfig);


// initialize Firebase Auth for that app immediately
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export {app, auth};
