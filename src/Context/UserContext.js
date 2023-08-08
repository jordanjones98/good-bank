import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { applicationConfig } from "../config.local.js";

export var user = null;

export const UserContext = React.createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const apiUrl = applicationConfig.apiUrl;

  const tryToGetUser = useCallback(async () => {
    const token = localStorage.getItem("token");

    const navigateIfNeeded = () => {
      const path = location.pathname;
      const nonNavigateLinks = ["/login", "/createaccount"];

      setIsLoading(false);

      if (!nonNavigateLinks.includes(path)) {
        navigate("/login");
      }
    };

    if (user || !token) {
      navigateIfNeeded();
      return;
    }

    const headers = new Headers();
    headers.append("Authorization", token);

    fetch(`${apiUrl}/me`, { method: "GET", headers })
      .then(async (response) => {
        const data = await response.json();
        if (!data.error) {
          setUser(data);
        }
      })
      .finally(() => setIsLoading(false));
  }, [setUser, user, location, navigate, apiUrl]);

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

    fetch(`${apiUrl}/login`, {
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
        navigate("/deposit");
        return;
      }

      throw new Error(data.errorMessage);
    });
  }

  async function withdraw(amount) {
    const headers = new Headers();
    headers.append("Authorization", localStorage.getItem("token"));
    headers.append("Content-Type", "application/json");

    const data = { amount: amount };

    fetch(`${apiUrl}/withdraw`, {
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

    fetch(`${apiUrl}/deposit`, {
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

  async function handleLogout() {
    const headers = new Headers();
    headers.append("Authorization", localStorage.getItem("token"));

    fetch(`${apiUrl}/logout`, { method: "GET", headers }).then(
      async (response) => {
        setUser(null);
        localStorage.removeItem("token");
        return;
      }
    );
  }

  async function createAccount(name, email, password) {
    const data = {
      name,
      email,
      password,
    };

    fetch(`${apiUrl}/createaccount`, {
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
        navigate("/deposit");
        return;
      }

      throw new Error(data.errorMessage);
    });
  }

  return (
    <>
      {!isLoading ? (
        <UserContext.Provider
          value={{
            user,
            tryToLoginUser,
            handleLogout,
            withdraw,
            deposit,
            createAccount,
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
