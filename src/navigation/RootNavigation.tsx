import {
  createNativeStackNavigator,
  createNativeStackScreen,
} from "@react-navigation/native-stack";

import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import useAuthentication from "../hooks/useAuthentication";
import { AuthStatusEnums } from "../enums/general";
import LoadingScreen from "../screens/LoadingScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";

const RootNavigation = () => {
  const { authStatus } = useAuthentication();

  return createNativeStackNavigator({
    screens:
      authStatus === AuthStatusEnums.UNKNOWN
        ? {
            Loading: createNativeStackScreen({
              screen: LoadingScreen,
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
                  headerShown: false,
                },
              }),
            }
          : {
              Login: createNativeStackScreen({
                screen: LoginScreen,
                options: {
                  headerShown: false,
                },
              }),
              SignUp: createNativeStackScreen({
                screen: SignupScreen,
                options: {
                  headerShown: false,
                },
              }),
              ForgotPassword: createNativeStackScreen({
                screen: ForgotPasswordScreen,
                options: {
                  headerShown: false,
                },
              }),
            },
  });
};

export default RootNavigation;
