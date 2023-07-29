import React, { useState, useContext } from "react";
import { FirebaseContext } from "./FirebaseContext";
import { setDoc, doc } from "firebase/firestore";

export var user = null;

export const UserContext = React.createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState();
  const firebaseContext = useContext(FirebaseContext);
  const db = firebaseContext.db;

  async function updateUser(user) {
    try {
      const userDoc = doc(db, "users", user.authUid);
      await setDoc(userDoc, user);

      setUser(user);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};
