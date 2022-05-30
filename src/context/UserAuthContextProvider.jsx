import React, { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { auth } from "../firebase/firebase-config";
import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

const userAuthContext = createContext();

const UserAuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  // Model state to open model from the Navbar to the Feed.
  const [modelOpen, setModelOpen] = useState(false);

  // Fuctions for Firebase Authentications
  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }
  function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function googleSignIn() {
    const googleAuthProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleAuthProvider);
  }
  function logOut() {
    return signOut(auth);
  }

  // After Every time App loads it Check if the user is logged in or NOT.
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      // console.log("Auth: ", currentuser);
      setUser(currentuser);
    });
    return () => {
      unsubscribe();
    };
  }, []);
  return (
    // Context API is used for the Global state management of the application,
    // Provided all the functions and states to the Contect API
    <userAuthContext.Provider
      value={{
        user,
        googleSignIn,
        logOut,
        logIn,
        signUp,
        modelOpen,
        setModelOpen,
      }}
    >
      {children}
    </userAuthContext.Provider>
  );
};

export default UserAuthContextProvider;

export function useUserAuth() {
  return useContext(userAuthContext);
}
