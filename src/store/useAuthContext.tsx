import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { UserType } from "../interfaces/general";
import { getUserData } from "../services/auth.service";
import { AuthStatusEnums } from "../enums/general";

export const AuthContext = createContext<{
  authStatus: AuthStatusEnums;
  user: UserType | null;
  setAuthStatus: Dispatch<SetStateAction<AuthStatusEnums>>;
  login: (data: Omit<UserType, "name">) => Promise<{
    isSuccess: boolean;
    message: string;
  }>;
  signUp: (data: UserType) => Promise<{
    isSuccess: boolean;
    message: string;
  }>;
  logOut: () => Promise<void>;
}>({
  authStatus: AuthStatusEnums.UNKNOWN,
  user: null,
  setAuthStatus: () => {},
  login: async () => ({ isSuccess: false, message: "" }),
  signUp: async () => ({ isSuccess: false, message: "" }),
  logOut: async () => {},
});

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<null | UserType>(null);
  const [authStatus, setAuthStatus] = useState<AuthStatusEnums>(
    AuthStatusEnums.UNKNOWN,
  );

  async function login(data: Omit<UserType, "name">) {
    const usersData = await getUserData();

    const user = usersData.find((item) => item.email === data.email);

    if (!user) {
      throw new Error("User not found. Please proceed to sign up screen.");
    }

    if (user.password !== data.password) {
      throw new Error(
        "Password is incorrect. Check or reset your password to login.",
      );
    }

    await AsyncStorage.setItem(
      "user",
      JSON.stringify({ ...data, time: Date.now() }),
    );
    setUser(user);
    setAuthStatus(AuthStatusEnums.AUTH);

    return {
      isSuccess: true,
      message: "Login Successfully!",
    };
  }

  async function signUp(data: UserType) {
    const users = await AsyncStorage.getItem("users");

    if (!users) throw new Error("Failed loading users. Please try again.");

    const userData: UserType[] = JSON.parse(users);
    const exist = userData.some((item) => item.email === data.email);

    if (exist)
      throw new Error("User already exists. Please proceed to login screen.");

    userData.push(data);

    await AsyncStorage.setItem("users", JSON.stringify(userData));
    await AsyncStorage.setItem(
      "user",
      JSON.stringify({ ...data, time: Date.now() }),
    );

    await AsyncStorage.setItem("user", JSON.stringify(null));
    setUser(data);
    setAuthStatus(AuthStatusEnums.AUTH);

    return {
      isSuccess: true,
      message: "Signup success.",
    };
  }

  async function logOut() {
    setUser(null);
    setAuthStatus(AuthStatusEnums.UNAUTH);
  }

  return (
    <AuthContext.Provider
      value={{
        authStatus,
        user,
        setAuthStatus,
        login,
        logOut,
        signUp,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
