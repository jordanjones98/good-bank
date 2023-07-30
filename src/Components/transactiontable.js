import React from "react";
import { prettyNumber } from "../Utilities/prettyNumber";

const TransactionTable = (props) => {
  const transactions = props.transactions || [];
  const title = props.title;

  return (
    <>
      {transactions && transactions.length > 0 && (
        <div className="mt-4 mx-1">
          <h4 className="text-center" style={{ textDecoration: "underline" }}>
            {title}
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
              {transactions.map((transaction, key) => {
                return (
                  <tr key={key}>
                    <td>{transaction.date}</td>
                    <td className="text-end">
                      ${prettyNumber(transaction.amount)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default TransactionTable;
