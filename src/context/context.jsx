"use client";

import { createContext } from "react";

const AccessContext = createContext();

const AccessProvider = ({ children }) => {

    return (
    <AccessContext.Provider
      value={{}}
    >
      {children}
    </AccessContext.Provider>
  );
};

export { AccessContext, AccessProvider };