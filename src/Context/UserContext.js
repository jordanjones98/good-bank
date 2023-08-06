import React, { useState, useContext, useEffect, useCallback } from "react";
import { FirebaseContext } from "./FirebaseContext";
import { doc, setDoc, getDoc } from "firebase/firestore";
import {
  getAuth,
  signOut,
  signInWithEmailAndPassword,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";

export var user = null;

export const UserContext = React.createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const firebaseContext = useContext(FirebaseContext);
  const db = firebaseContext.db;
  const auth = getAuth();

  const tryToGetUser = useCallback(async () => {
    try {
      console.log(auth);
      const authUser = auth.currentUser;
      console.log(authUser);
      if (authUser) {
        const userDocRef = doc(db, "users", authUser.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (!userDocSnap.exists()) {
          console.log("user not found");
          return false;
        }

        const user = userDocSnap.data();
        setUser(user);
        return user;
      }

      console.log("No logged in user found");

      return null;
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [setUser, db, auth]);

  useEffect(() => {
    const getUser = async () => {
      await tryToGetUser();
    };

    if (!user) {
      getUser();
    }
  }, [user, tryToGetUser]);

  async function tryToLoginUser(email, password) {
    const data = {
      email,
      password,
    };

    fetch("http://localhost:4000/login", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data.error) {
          setUser(data);
          return;
        }

        throw new Error(data.errorMessage);
      });
  }

  async function updateUser(user) {
    try {
      const userDoc = doc(db, "users", user.authUid);
      await setDoc(userDoc, user);

      setUser(user);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  async function handleLogout() {}

  return (
    <>
      {!isLoading ? (
        <UserContext.Provider
          value={{
            user,
            updateUser,
            tryToLoginUser,
            handleLogout,
          }}
        >
          {children}
        </UserContext.Provider>
      ) : (
        <>
          <div className="container">
            <div className="row mt-5 text-center">
              <h1>Loading</h1>
            </div>
            <div className="row mt-2">
              <div className="text-center">
                <div className="spinner-border" role="status"></div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
