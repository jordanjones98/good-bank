import React, { useState, useContext } from "react";
import Structure from "./structure";
import { UserContext } from "../Context/UserContext";
import TransactionTable from "./transactiontable";
import { prettyNumber } from "../Utilities/prettyNumber";

const Withdraw = () => {
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
    const [withdrawAmount, setWithdrawAmount] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    /* eslint-enable */

    const handleWithdraw = async () => {
      setErrorMessage("");
      setSuccessMessage("");

      if (withdrawAmount === "") {
        setErrorMessage("Enter withdrawal amount");
        return;
      } else if (isNaN(withdrawAmount)) {
        setErrorMessage("Enter valid number");
        return;
      } else if (parseFloat(withdrawAmount) > user.balance) {
        setErrorMessage("Withdrawal exceeds current balance");
        return;
      }

      const amount = parseFloat(withdrawAmount).toFixed(2);

      await userContext.withdraw(amount);

      setSuccessMessage(
        `Withdrawal of $${prettyNumber(amount)} processed successfully.`
      );
      setWithdrawAmount("");
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
                    Withdrawals
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

                  <TransactionTable
                    transactions={user.withdraws}
                    title="Withdraw Log"
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

export default Withdraw;
