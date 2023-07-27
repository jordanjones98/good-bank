import React, { useState } from "react";
import Structure from "./structure";

const Withdraw = () => {
  if(localStorage.getItem("currentUser") === null) {
    return (
      <div className="container">
        <h2 className="text-center mt-5 mb-3">Create an account before using system</h2>
      </div>
    )
  }
  else {
    /* eslint-disable */
    var currentUser = localStorage.getItem("currentUser");
    var user = JSON.parse(localStorage.getItem(currentUser));
    const [withdrawAmount, setWithdrawAmount] = useState("");
    var [displayedBalance, setBalance] = useState(user.balance);
    var balance = user.balance
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    /* eslint-enable */

    const handleWithdraw = () => {
      if (withdrawAmount === "") {
        setErrorMessage("Enter withdrawal amount");
      } else if (isNaN(withdrawAmount)) {
        setErrorMessage("Enter valid number");
      } else if (parseFloat(withdrawAmount) > balance) {
        setErrorMessage("Withdrawal exceeds current balance");
      } else {
        const newBalance = balance - parseFloat(withdrawAmount);
        setBalance(newBalance);
        balance = newBalance;
        var name = user.name
        var email = user.email
        var password = user.password
        localStorage.setItem(currentUser, JSON.stringify({name, email, password, balance}));
        setSuccessMessage(`Withdrawal of $${withdrawAmount} processed successfully.`);
        setWithdrawAmount("");
        setErrorMessage("");
      }
    };

    return (
      <Structure>
        <div className="container mt-5">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title text-center" style={{ textDecoration: "underline" }}>Withdrawals</h4>
                  {successMessage && (
                    <div className="alert alert-success" role="alert">
                      {successMessage}
                    </div>
                  )}
                  {errorMessage && (
                    <div className="alert alert-danger" role="alert">
                      {errorMessage}
                    </div>
                  )}
                  <div className="form-group">
                    <label htmlFor="balance">Balance</label>
                    <input
                      type="text"
                      className="form-control"
                      id="balance"
                      value={`$${displayedBalance}`}
                      readOnly
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="withdrawAmount">Withdraw Amount</label>
                    <input
                      type="number"
                      className="form-control"
                      id="withdrawAmount"
                      value={withdrawAmount}
                      onChange={(e) => setWithdrawAmount(e.target.value)}
                    />
                  </div>
                  <button
                    type="button"
                    className="btn btn-dark"
                    onClick={handleWithdraw}
                    disabled={!withdrawAmount}
                  >
                    Withdraw
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Structure>
    );
  };
};

export default Withdraw;