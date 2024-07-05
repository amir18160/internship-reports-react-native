import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUserStore } from "stores/userStore";

export function useInitializeStore() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasUser, setHasUser] = useState(false);
  const setUserAndToken = useUserStore((state) => state.setUserAndToken);

  useEffect(() => {
    const initializeStore = async () => {
      try {
        const userAndTokenStr = await AsyncStorage.getItem("userInfo");

        if (userAndTokenStr) {
          const userAndData = JSON.parse(userAndTokenStr);
          setUserAndToken(userAndData.state);
          setHasUser(true);
        }
      } catch (err) {
        console.error("Failed to sync user storage to store", err);
      } finally {
        setIsLoading(false);
      }
    };

    initializeStore();
  }, [setUserAndToken]);

  return { isLoading, hasUser };
}
