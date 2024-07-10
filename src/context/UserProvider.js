"use client";

import React, { useEffect, useState } from "react";
import UserContext from "./UserContext";
import { currentUser } from "../services/user";

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(undefined);
  useEffect(() => {
    async function load() {
      try {
        // const authToken = localStorage.getItem("authToken");
        const logUser = await currentUser(authToken);
        setUser({ ...logUser });
      } catch (error) {
        setUser(undefined);
      }
    }
    load();
  }, []);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
