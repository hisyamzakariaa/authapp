import { createStaticNavigation } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  createNativeStackScreen,
} from "@react-navigation/native-stack";

import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";

const authedStack = createNativeStackNavigator({
  screens: {
    Homescreen: createNativeStackScreen({
      screen: HomeScreen,
      options: {
        headerShown: false,
      },
    }),
  },
});

const unauthedStack = createNativeStackNavigator({
  screens: {
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

export const AuthedNavigation = createStaticNavigation(authedStack);
export const UnauthedNavigation = createStaticNavigation(unauthedStack);
