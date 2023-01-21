import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"


const firebaseConfig = {
    apiKey: "AIzaSyBpz0gsTBueGXhfuGvNjeRF3MCEzVF9jXQ",
    authDomain: "alkomix-firebase.firebaseapp.com",
    projectId: "alkomix-firebase",
    storageBucket: "alkomix-firebase.appspot.com",
    messagingSenderId: "984486644950",
    appId: "1:984486644950:web:3c925d42c0b69bf1ca4d77"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export{
    db
}