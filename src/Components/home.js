import React from "react";
import logo from "../bank.png";
import Structure from "./structure";


const Home = () => {
  localStorage.clear()
  return (
    <Structure>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body text-center">
                <h4 className="card-header">Welcome to the Bad Bank!</h4>
                <div className="card-body">
                  <h6 className="card-text">This is a Bad Bank because it is NOT SECURE!</h6>
                </div>
                <img src={logo} className="card-img-top img-center" alt="" style={{ width: "18rem" }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Structure>
  );
};

export default Home;