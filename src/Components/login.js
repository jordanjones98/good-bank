import React, { useState, useContext } from "react";
import Structure from "./structure";
import { UserContext } from "../Context/UserContext";
import { FirebaseContext } from "../Context/FirebaseContext";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const userContext = useContext(UserContext);
  const firebaseContext = useContext(FirebaseContext);
  const db = firebaseContext.db;

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!email) {
      alert("Please enter your email address.");
    } else if (!password) {
      alert("Please enter your password.");
    } else {
      try {
        const authUser = await login(email, password);

        localStorage.setItem("user-token", authUser.accessToken);

        // user.uid = authUser.uid;
        const dbUser = await getDbUser(authUser.uid);
        console.log(dbUser);
        userContext.updateUser(dbUser);
      } catch (error) {
        console.log(error);
        alert("Error creating account");
      }
    }
  };

  const getDbUser = async (uid) => {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      throw new Error("User not found");
    }

    return docSnap.data();
  };

  const login = async (email, password) => {
    const auth = getAuth();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      return userCredential.user;
    } catch (error) {
      console.log("Error creating user", error.code, error.message);
      throw error;
    }
  };
  return (
    <Structure>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <>
                  <h4
                    className="card-title text-center"
                    style={{ textDecoration: "underline" }}
                  >
                    Login
                  </h4>
                  <form onSubmit={handleSubmit}>
                    <div className="form-group mt-2">
                      <label htmlFor="emailInput">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        id="emailInput"
                        placeholder="Email"
                        value={email}
                        onChange={handleEmailChange}
                      />
                    </div>
                    <div className="form-group mt-2">
                      <label htmlFor="passwordInput">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        id="passwordInput"
                        placeholder="Password"
                        value={password}
                        onChange={handlePasswordChange}
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn btn-dark mt-2"
                      disabled={!email || !password}
                    >
                      Login
                    </button>
                  </form>
                </>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Structure>
  );
};

export default Login;
