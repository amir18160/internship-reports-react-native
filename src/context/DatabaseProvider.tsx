// src/context/DatabaseContext.js
import React, { createContext, useEffect } from "react";
import { Text, View } from "react-native";
import { useSQlite } from "hooks/useSQlite";
import { useUserStore } from "stores/userStore";

const DatabaseContext = createContext(null);

export const DatabaseProvider = ({ children }: any) => {
  const { isError, isSuccess, isPending, DBInitialization, isDatabaseLoading } =
    useSQlite();
  const token = useUserStore((state) => state.token);

  useEffect(
    function () {
      DBInitialization();
    },
    [token, isDatabaseLoading],
  );

  // check if the connection is okay then => return loading instead of nothing!
  // return ui status if connection is not ok
  // return ui status if connection is ok

  console.log("isDatabaseLoading: ", isDatabaseLoading);
  console.log("isPending: ", isPending);

  if (isDatabaseLoading || isPending)
    return (
      <View>
        <Text>loading</Text>
      </View>
    );

  if (!isSuccess && isError) {
    return (
      <View>
        <Text>error</Text>
      </View>
    );
  }

  if (isSuccess || !isError) {
    return <DatabaseContext.Provider value={null}>{children}</DatabaseContext.Provider>;
  }
};
