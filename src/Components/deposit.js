import React, { useState, useContext } from "react";
import Structure from "./structure";
import { UserContext } from "../Context/UserContext";
import TransactionTable from "./transactiontable";
import { prettyNumber } from "../Utilities/prettyNumber";

const Deposit = () => {
  const userContext = useContext(UserContext);
  const user = userContext.user;
  if (!user) {
    return (
      <div className="container">
        <h2 className="text-center mt-5 mb-3">
          Create an account before using system
        </h2>
      </div>
    );
  } else {
    /* eslint-disable */
    var [depositAmount, setDepositAmount] = useState("");
    var [successMessage, setSuccessMessage] = useState("");
    var [errorMessage, setErrorMessage] = useState("");
    /* eslint-enable */

    const handleDeposit = async () => {
      setErrorMessage("");
      setSuccessMessage("");
      if (depositAmount === "") {
        setErrorMessage("Enter deposit amount");
        return;
      } else if (isNaN(depositAmount)) {
        setErrorMessage("Enter valid number");
        return;
      } else if (parseFloat(depositAmount) <= 0) {
        setErrorMessage("Negative Deposit");
        return;
      }

      const amount = parseFloat(depositAmount).toFixed(2);

      await userContext.deposit(amount);

      setSuccessMessage(`Deposit of $${prettyNumber(amount)} was successful`);
      setDepositAmount("");
    };

    return (
      <Structure>
        <div className="container mt-5">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <h4
                    className="card-title text-center"
                    style={{ textDecoration: "underline" }}
                  >
                    Deposits
                  </h4>
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
                  <div className="form-group mb-2">
                    <label htmlFor="balance">Balance</label>
                    <input
                      type="text"
                      className="form-control"
                      id="balance"
                      value={`$${prettyNumber(user.balance)}`}
                      readOnly
                    />
                  </div>
                  <div className="form-group mb-2">
                    <label htmlFor="depositAmount">Deposit Amount</label>
                    <input
                      type="number"
                      className="form-control"
                      id="depositAmount"
                      value={depositAmount}
                      onChange={(e) => setDepositAmount(e.target.value)}
                    />
                  </div>
                  <button
                    type="button"
                    className="btn btn-dark"
                    onClick={handleDeposit}
                    disabled={!depositAmount}
                  >
                    Deposit
                  </button>

                  <TransactionTable
                    transactions={user.deposits}
                    title="Deposit Log"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Structure>
    );
  }
};
export default Deposit;
