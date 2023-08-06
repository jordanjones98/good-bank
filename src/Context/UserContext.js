import React, { useState, useContext, useEffect, useCallback } from "react";
import { FirebaseContext } from "./FirebaseContext";
import { doc, setDoc } from "firebase/firestore";

export var user = null;

export const UserContext = React.createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const firebaseContext = useContext(FirebaseContext);
  const db = firebaseContext.db;

  const tryToGetUser = useCallback(async () => {
    const headers = new Headers();
    headers.append("Authorization", localStorage.getItem("token"));

    fetch("http://localhost:4000/me", { method: "GET", headers })
      .then(async (response) => {
        const data = await response.json();
        if (!data.error) {
          setUser(data);
          return;
        }

        throw new Error(data.errorMessage);
      })
      .finally(() => setIsLoading(false));
  }, [setUser]);

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
    }).then(async (response) => {
      const data = await response.json();

      if (!data.error) {
        localStorage.setItem("token", data.token);
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

  async function withdraw(amount) {
    const headers = new Headers();
    headers.append("Authorization", localStorage.getItem("token"));
    headers.append("Content-Type", "application/json");

    const data = { amount: amount };

    fetch("http://localhost:4000/withdraw", {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    }).then(async (response) => {
      const data = await response.json();
      if (!data.error) {
        setUser(data);
        return;
      }

      throw new Error(data.errorMessage);
    });
  }

  async function deposit(amount) {
    const headers = new Headers();
    headers.append("Authorization", localStorage.getItem("token"));
    headers.append("Content-Type", "application/json");

    const data = { amount: amount };

    fetch("http://localhost:4000/deposit", {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    }).then(async (response) => {
      const data = await response.json();
      if (!data.error) {
        setUser(data);
        return;
      }

      throw new Error(data.errorMessage);
    });
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
            withdraw,
            deposit,
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
