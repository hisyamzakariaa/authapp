import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

import { UserType } from "../interfaces/general";

export const AuthContext = createContext<{
  isAuthenticated: boolean;
  user: UserType | null;
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
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
  isAuthenticated: false,
  user: null,
  setIsAuthenticated: () => {},
  login: async () => ({ isSuccess: false, message: "" }),
  signUp: async () => ({ isSuccess: false, message: "" }),
  logOut: async () => {},
});

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [userList, setUserList] = useState<UserType[]>([
    { email: "test@test.com", name: "test", password: "123456" },
  ]);
  const [user, setUser] = useState<null | UserType>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  async function login(data: Omit<UserType, "name">) {
    const user = userList.find((item) => item.email === data.email);

    if (!user) {
      throw new Error("User not found. Please proceed to sign up screen.");
    }

    if (user.password !== data.password) {
      throw new Error("Password is incorrect. Reset your password to login.");
    }

    setUser(user);
    setIsAuthenticated(true);

    return {
      isSuccess: true,
      message: "Login Successfully!",
    };
  }

  async function signUp(data: UserType) {
    const exist = userList.some((item) => item.email === data.email);

    if (exist)
      throw new Error("User already exists. Please proceed to login screen.");

    setUserList((prev) => [...prev, data]);
    setUser(data);
    setIsAuthenticated(true);

    return {
      isSuccess: true,
      message: "Signup success.",
    };
  }

  async function logOut() {
    setUser(null);
    setIsAuthenticated(false);
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        setIsAuthenticated,
        login,
        logOut,
        signUp,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
