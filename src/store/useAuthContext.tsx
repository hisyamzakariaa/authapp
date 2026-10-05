import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { UserType } from "../interfaces/general";
import { getLoggedInUser, getUserData } from "../services/auth.service";
import { AuthStatusEnums } from "../enums/general";

export const AuthContext = createContext<{
  authStatus: AuthStatusEnums;
  user: UserType | null;
  setAuthStatus: Dispatch<SetStateAction<AuthStatusEnums>>;
  login: (data: Omit<UserType, "name">) => Promise<void>;
  resetPass: (data: Omit<UserType, "name">) => Promise<void>;
  signUp: (data: UserType) => Promise<void>;
  logOut: () => Promise<void>;
}>({
  authStatus: AuthStatusEnums.UNKNOWN,
  user: null,
  setAuthStatus: () => {},
  login: async () => {},
  resetPass: async () => {},
  signUp: async () => {},
  logOut: async () => {},
});

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<null | UserType>(null);
  const [authStatus, setAuthStatus] = useState<AuthStatusEnums>(
    AuthStatusEnums.UNKNOWN,
  );

  async function login(rawData: Omit<UserType, "name">) {
    const data = {
      email: rawData.email.trim(),
      password: rawData.password.trim(),
    };
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
      JSON.stringify({ ...user, time: Date.now() }),
    );
    setUser(user);
    setAuthStatus(AuthStatusEnums.AUTH);
  }

  async function signUp(rawData: UserType) {
    const data = {
      email: rawData.email.trim(),
      name: rawData.name.trim(),
      password: rawData.password.trim(),
    };
    const userData = await getUserData();

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
  }

  async function logOut() {
    await AsyncStorage.setItem("user", JSON.stringify(null));
    setUser(null);
    setAuthStatus(AuthStatusEnums.UNAUTH);
  }

  async function fetchLoggedInUser() {
    const user = await getLoggedInUser();

    if (user)
      setUser({ email: user.email, name: user.name, password: user.password });
  }

  async function resetPass(rawData: Omit<UserType, "name">) {
    const data = {
      email: rawData.email.trim(),
      password: rawData.password.trim(),
    };
    const usersData = await getUserData();

    const user = usersData.find((item) => item.email === data.email);

    if (!user) {
      throw new Error("User not found. Make sure you give the correct email.");
    }

    const index = usersData.findIndex((item) => item.email === data.email);

    usersData[index].password = data.password;

    await AsyncStorage.setItem("users", JSON.stringify(usersData));
  }

  useEffect(() => {
    if (authStatus === AuthStatusEnums.AUTH) fetchLoggedInUser();
  }, [authStatus]);

  return (
    <AuthContext.Provider
      value={{
        authStatus,
        user,
        resetPass,
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
