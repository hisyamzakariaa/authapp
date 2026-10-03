import {
  createNativeStackNavigator,
  createNativeStackScreen,
} from "@react-navigation/native-stack";

import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import useAuthentication from "../hooks/useAuthentication";
import { AuthStatusEnums } from "../enums/general";
import LoadinScreen from "../screens/LoadinScreen";
import useAuthValidation from "../hooks/useAuthValidation";

const RootNavigation = () => {
  const { authStatus } = useAuthentication();

  useAuthValidation();

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
