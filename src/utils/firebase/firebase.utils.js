// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { 
        getAuth, 
        signInWithRedirect, 
        signInWithPopup, 
        GoogleAuthProvider,
        createUserWithEmailAndPassword}
        from 'firebase/auth';
import {
    getFirestore, 
    doc, 
    getDoc, 
    setDoc}
    from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDhYw7pTjLldC6qkBlOiyyVnSborheNSy8",
  authDomain: "crwn-clothing-db-1b9dd.firebaseapp.com",
  projectId: "crwn-clothing-db-1b9dd",
  storageBucket: "crwn-clothing-db-1b9dd.appspot.com",
  messagingSenderId: "468916871061",
  appId: "1:468916871061:web:2731c99b260c206b9f609c"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider(); 
googleProvider.setCustomParameters({
    prompt: "select_account"
}); 

export const auth = getAuth(); 
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider); 
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider); 

export const db = getFirestore(); 

export const createUserDocumentFromAuth = async (
    userAuth, 
    additionalInformation = {}) => {
    const userDocRef = doc(db, 'users', userAuth.uid); 
    const userSnapshot = await getDoc(userDocRef);

    if(!userSnapshot.exists()){
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try{
            await setDoc(userDocRef, {
                displayName, 
                email, 
                createdAt, 
                ...additionalInformation,
            });
        }catch(error){
            console.log('error creating the user ', error.message);
        }
    }
    return userDocRef;

    //if user data does not exist

    //return userDocRef
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return; 

    return createUserWithEmailAndPassword(auth, email, password);
}