import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyAo6oXXcTiVuiQ9vB0C1CI5RDGdQDJNygs",
  authDomain: "veyron-mall.firebaseapp.com",
  databaseURL: "https://veyron-mall.firebaseio.com",
  projectId: "veyron-mall",
  storageBucket: "veyron-mall.appspot.com",
  messagingSenderId: "1032227614027",
  appId: "1:1032227614027:web:5cdd7f1bc1089d0683ccce",
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
