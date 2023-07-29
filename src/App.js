import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./Components/navbar";
import Home from "./Components/home";
import CreateAccount from "./Components/createaccount";
import Login from "./Components/login";
import AllData from "./Components/alldata";
import Deposit from "./Components/deposit";
import Withdraw from "./Components/withdraw";
import { UserContextProvider } from "./Context/UserContext";
import { FirebaseContextProvider } from "./Context/FirebaseContext";

function App() {
  return (
    <FirebaseContextProvider>
      <UserContextProvider>
        <Router>
          <div className="App">
            <Navbar />
            <Routes>
              <Route exact path="/" element={<Home />}></Route>
              <Route path="/createaccount" element={<CreateAccount />}></Route>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/deposit" element={<Deposit />}></Route>
              <Route path="/withdraw" element={<Withdraw />}></Route>
              <Route path="/alldata" element={<AllData />}></Route>
            </Routes>
          </div>
        </Router>
      </UserContextProvider>
    </FirebaseContextProvider>
  );
}

export default App;
