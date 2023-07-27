import React, { useState } from "react";

export var user = null;
export function setUser(givenUser) {
  console.log(givenUser);
  user = givenUser;
  console.log(user);
}

export const UserContext = React.createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState();

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
