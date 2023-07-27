import React from "react";
import Structure from "./structure";

const AllData = () => {
  const usernames = [];
  for (var i = 0; i < localStorage.length; i++){
    if (localStorage.key(i) != 'currentUser') {
      var user = JSON.parse(localStorage.getItem(localStorage.key(i)));
      usernames.push(<p key={i}>Name : {user.name}</p>);
      usernames.push(<p key={i+1}>Email : {user.email}</p>);
      usernames.push(<p key={i+2}>Password : {user.password}</p>);
      usernames.push(<p key={i+3}>Balance : {user.balance.toFixed(2)}</p>);
      usernames.push(<br key={i+4} />);
    }
  }

  return (
    <Structure>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title text-center" style={{ textDecoration: "underline" }}>All Data</h4>
                {usernames}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Structure>
  )
}

export default AllData;
