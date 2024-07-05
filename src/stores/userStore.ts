// lib
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

// types
import { User } from "types/UserType";
import { Token } from "types/TokenType";
import { AuthResponseType } from "types/AuthResponseType";

// interface
interface UserState {
  user: User | null;
  token: Token | null;
}

interface UserActions {
  setUser: (user: User) => void;
  setToken: (token: Token) => void;
  setUserAndToken: (userAndToken: AuthResponseType) => void;
}

export const useUserStore = create<UserState & UserActions>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,

      setUser: (user) => {
        set((state) => ({ ...state, user }));
      },

      setToken: (token) => {
        set((state) => ({ ...state, token }));
      },

      setUserAndToken: (userAndToken) => {
        set((state) => ({
          ...state,
          user: userAndToken.user,
          token: userAndToken.token,
        }));
      },
    }),
    { name: "userInfo", storage: createJSONStorage(() => AsyncStorage) },
  ),
);
