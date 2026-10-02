import { createContext, ReactNode, useState } from "react";
import { NavigationProp, UserType } from "../interfaces/general";
import { useNavigation } from "@react-navigation/native";

export const AuthContext = createContext<{
  isAuthenticated: boolean;
  user: UserType | null;
  login: (data: Omit<UserType, "name">) => boolean;
  signUp: (data: UserType) => boolean;
  logOut: () => Promise<void>;
}>({
  isAuthenticated: false,
  user: null,
  login: () => false,
  signUp: () => false,
  logOut: async () => {},
});

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [userList, setUserList] = useState<UserType[]>([]);
  const [user, setUser] = useState<null | UserType>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  console.log(userList, isAuthenticated);

  function login(data: Omit<UserType, "name">) {
    let isSuccess = false;

    const user = userList.find(
      (item) => item.email === data.email && item.password === data.password,
    );

    if (user) {
      setUser(user);
      setIsAuthenticated(true);
      isSuccess = true;
    }

    return isSuccess;
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
