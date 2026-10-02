import { createContext, ReactNode, useState } from "react";
import { UserType } from "../interfaces/general";

export const AuthContext = createContext<{
  isAuthenticated: boolean;
  user: UserType | null;
  login: (data: Omit<UserType, "name">) => {
    isSuccess: boolean;
    message: string;
  };
  signUp: (data: UserType) => boolean;
  logOut: () => Promise<void>;
}>({
  isAuthenticated: false,
  user: null,
  login: () => ({ isSuccess: false, message: "" }),
  signUp: () => false,
  logOut: async () => {},
});

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [userList, setUserList] = useState<UserType[]>([]);
  const [user, setUser] = useState<null | UserType>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  function login(data: Omit<UserType, "name">) {
    let isSuccess = false;
    const user = userList.find(
      (item) => item.email === data.email && item.password === data.password,
    );

    if (!user)
      return {
        isSuccess,
        message: "User not found. Please proceed to sign up screen.",
      };

    const isValidPass = user.password === data.password;
    if (!isValidPass)
      return {
        isSuccess,
        message: "Password is incorrect. Reset your password to login.",
      };

    setUser(user);
    setIsAuthenticated(true);
    isSuccess = true;
    return {
      isSuccess,
      message: "Login Successfully!",
    };
  }

  function signUp(data: UserType) {
    let isSuccess = false;

    const exist = userList.some(
      (item) => item.email === data.email && item.password === data.password,
    );

    if (!exist) {
      setUserList((prev) => [...prev, data]);
      setUser(data);
      setIsAuthenticated(true);
      isSuccess = true;
    }

    return isSuccess;
  }

  async function logOut() {}

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, login, logOut, signUp }}
    >
      {children}
    </AuthContext.Provider>
  );
}
