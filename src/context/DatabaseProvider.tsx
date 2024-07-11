// src/context/DatabaseContext.js
import React, { createContext, useEffect } from "react";
import { Text, View } from "react-native";
import { useUserStore } from "stores/userStore";

const DatabaseContext = createContext(null);

export const DatabaseProvider = ({ children }: any) => {
  // check if the connection is okay then => return loading instead of nothing!
  // return ui status if connection is not ok
  // return ui status if connection is ok

  return <DatabaseContext.Provider value={null}>{children}</DatabaseContext.Provider>;
};
