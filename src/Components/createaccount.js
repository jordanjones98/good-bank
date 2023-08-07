import React, { useState, useContext } from "react";
import Structure from "./structure";
import { UserContext } from "../Context/UserContext";

const CreateAccount = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const userContext = useContext(UserContext);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!name) {
      alert("Please enter your name.");
    } else if (!email) {
      alert("Please enter your email address.");
    } else if (!password) {
      alert("Please enter your password.");
    } else if (password.length < 8) {
      alert("Password must be at least 8 characters long.");
    } else {
      try {
        userContext.createAccount(name, email, password);
      } catch (error) {
        console.log(error);
        alert("Error creating account");
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
                    Create Account
                  </h4>
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label htmlFor="nameInput">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="nameInput"
                        placeholder="Name"
                        value={name}
                        onChange={handleNameChange}
                      />
                    </div>
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

                    {password && password.length < 8 && (
                      <div className="alert alert-info mt-2">
                        Password must be 8 characters long
                      </div>
                    )}

                    <button
                      type="submit"
                      className="btn btn-dark mt-2"
                      disabled={
                        !name || !email || !password || password.length < 8
                      }
                    >
                      Create Account
                    </button>
                  </form>
                </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Structure>
  );
};

export default CreateAccount;
