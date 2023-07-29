import React from "react";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { firebaseConfig } from "../config.local";

export var user = null;

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const firebase = {
  db,
};
export const FirebaseContext = React.createContext(firebase);

export const FirebaseContextProvider = ({ children }) => {
  return (
    <FirebaseContext.Provider value={firebase}>
      {children}
    </FirebaseContext.Provider>
  );
};
