import React, { useState, useContext, useEffect, useCallback } from "react";
import { FirebaseContext } from "./FirebaseContext";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { addHours, isBefore } from "date-fns";

export var user = null;

export const UserContext = React.createContext();
const USER_TOKEN_NAME = "user-token";
const EXPIRE_DATE_NAME = "expire-date";
const SESSION_COLLECTION_NAME = "sessions";
const SESSION_LENGTH_HOURS = 6;

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const firebaseContext = useContext(FirebaseContext);
  const db = firebaseContext.db;

  const getUserFromSession = useCallback(async () => {
    const token = localStorage.getItem(USER_TOKEN_NAME);
    const expire = localStorage.getItem(EXPIRE_DATE_NAME);

    if (expire && isExpired(expire)) {
      console.log("Token Expired");
      return false;
    }

    const sessionDocRef = doc(db, SESSION_COLLECTION_NAME, token);
    const sessionDocSnap = await getDoc(sessionDocRef);

    if (!sessionDocSnap.exists()) {
      console.log("Token not found");
      return false;
    }

    const data = sessionDocSnap.data();

    if (isExpired(data.expireAt)) {
      return false;
    }

    const userDocRef = doc(db, "users", data.uid);
    const userDocSnap = await getDoc(userDocRef);

    if (!userDocSnap.exists()) {
      console.log("user not found");
      return false;
    }

    const user = userDocSnap.data();
    setUser(user);
    setIsLoading(false);
    return user;
  }, [db]);

  useEffect(() => {
    const getUser = async () => {
      await getUserFromSession();
    };

    if (!user) {
      getUser();
    }
  }, [user, getUserFromSession]);

  async function updateUser(user) {
    try {
      const userDoc = doc(db, "users", user.authUid);
      await setDoc(userDoc, user);

      setUser(user);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  const createUserSession = async (uid, token) => {
    const expireAt = addHours(new Date(), SESSION_LENGTH_HOURS).toISOString();

    localStorage.setItem(USER_TOKEN_NAME, token);
    localStorage.setItem(EXPIRE_DATE_NAME, expireAt);

    try {
      const sessionDoc = doc(db, SESSION_COLLECTION_NAME, token);

      await setDoc(sessionDoc, { uid, expireAt });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const isExpired = (expireDate) => {
    return isBefore(new Date(expireDate), new Date());
  };

  return (
    <>
      {!isLoading ? (
        <UserContext.Provider
          value={{ user, updateUser, getUserFromSession, createUserSession }}
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
                <div class="spinner-border" role="status"></div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
