import React, { useState, useContext } from "react";
import Structure from "./structure";
import { UserContext } from "../Context/UserContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const userContext = useContext(UserContext);

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
        userContext.tryToLoginUser(email, password);
      } catch (error) {
        console.log(error);
        alert(error.message);
      }
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
