import {
  createNativeStackNavigator,
  createNativeStackScreen,
} from "@react-navigation/native-stack";
import { useEffect } from "react";

import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import useAuthentication from "../hooks/useAuthentication";
import { getLoggedInUser } from "../services/auth.service";
import { LoggedInUserType } from "../interfaces/general";
import { AuthStatusEnums } from "../enums/general";
import LoadinScreen from "../screens/LoadinScreen";

const RootNavigation = () => {
  const { authStatus, setAuthStatus } = useAuthentication();

  useEffect(() => {
    if (authStatus === AuthStatusEnums.UNKNOWN) {
      async function authValidation() {
        try {
          const userData = await getLoggedInUser();

          if (!userData) {
            setAuthStatus(AuthStatusEnums.UNAUTH);
            return;
          }

          const currentTime = Date.now();
          const lastActive = (userData as LoggedInUserType).time;
          const timeDiff = (currentTime - lastActive) / (1000 * 60);

          setAuthStatus(
            timeDiff > 1 ? AuthStatusEnums.UNAUTH : AuthStatusEnums.AUTH,
          );
        } catch (error) {
          console.log(error);
        }
      }

      authValidation();
    }
  }, [authStatus]);

  console.log({ authStatus });

  return createNativeStackNavigator({
    screens:
      authStatus === AuthStatusEnums.UNKNOWN
        ? {
            Loading: createNativeStackScreen({
              screen: LoadinScreen,
              options: {
                headerShown: false,
              },
            }),
          }
        : authStatus === AuthStatusEnums.AUTH
          ? {
              Homescreen: createNativeStackScreen({
                screen: HomeScreen,
                options: {
                  title: "Home",
                  headerShown: false,
                },
              }),
            }
          : {
              Login: createNativeStackScreen({
                screen: LoginScreen,
                options: {
                  title: "Login",
                  headerShown: false,
                },
              }),
              SignUp: createNativeStackScreen({
                screen: SignupScreen,
                options: {
                  title: "Sign Up",
                  headerShown: false,
                },
              }),
            },
  });
};

export default RootNavigation;
