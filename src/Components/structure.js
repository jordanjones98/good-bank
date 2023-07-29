import React, { useContext, useEffect } from "react";
import { UserContext } from "../Context/UserContext";

const Structure = ({ children }) => {
  const userContext = useContext(UserContext);
  useEffect(() => {
    const getUser = async () => {
      await userContext.getUserFromSession();
    };

    if (!userContext.user) {
      getUser();
    }
  }, [userContext]);

  return <div className="container">{children}</div>;
};

export default Structure;
