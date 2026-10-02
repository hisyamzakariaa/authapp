import {
  createNativeStackNavigator,
  createNativeStackScreen,
} from "@react-navigation/native-stack";

import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import useAuthentication from "../hooks/useAuthentication";

const RootNavigation = () => {
  const { isAuthenticated } = useAuthentication();

  console.log({ isAuthenticated });

  return createNativeStackNavigator({
    screens: isAuthenticated
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
