import React, { useState, useContext } from "react";
import Structure from "./structure";
import { UserContext } from "../Context/UserContext";
import { format } from "date-fns";
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
    var [balance, setBalance] = useState(user.balance);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    /* eslint-enable */

    const handleWithdraw = () => {
      setErrorMessage("");
      setSuccessMessage("");

      if (withdrawAmount === "") {
        setErrorMessage("Enter withdrawal amount");
        return;
      } else if (isNaN(withdrawAmount)) {
        setErrorMessage("Enter valid number");
        return;
      } else if (parseFloat(withdrawAmount) > balance) {
        setErrorMessage("Withdrawal exceeds current balance");
        return;
      }

      const amount = parseFloat(withdrawAmount).toFixed(2);
      const newBalance = parseFloat(balance - amount).toFixed(2);
      setBalance(newBalance);
      user.balance = newBalance;

      if (!user.withdraws) {
        user.withdraws = [];
      }

      user.withdraws.push({
        date: format(new Date(), "MM/dd/yyyy 'at' h:mm a"),
        amount,
        balance: newBalance,
      });

      userContext.updateUser(user);
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
                      value={`$${prettyNumber(balance)}`}
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

                  {user.withdraws && user.withdraws.length > 0 && (
                    <div className="mt-4 mx-1">
                      <h4
                        className="text-center"
                        style={{ textDecoration: "underline" }}
                      >
                        Withdraw Log
                      </h4>
                      <table className="table table-striped">
                        <thead>
                          <tr>
                            <th scope="col">Date</th>
                            <th scope="col" className="text-end">
                              Amount
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {user.withdraws.map((withdraw, key) => {
                            return (
                              <tr key={key}>
                                <td>{withdraw.date}</td>
                                <td className="text-end">
                                  ${prettyNumber(withdraw.amount)}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}
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
