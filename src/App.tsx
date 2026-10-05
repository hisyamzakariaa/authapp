import { Assets as NavigationAssets } from "@react-navigation/elements";
import { DarkTheme, DefaultTheme } from "@react-navigation/native";
import { Asset } from "expo-asset";
import { createURL } from "expo-linking";
import * as SplashScreen from "expo-splash-screen";
import { useColorScheme, StatusBar, AppState } from "react-native";
import { useEffect, useRef } from "react";

import AuthProvider from "./store/useAuthContext";
import {
  AuthedNavigation,
  UnauthedNavigation,
} from "./navigation/RootNavigation";
import { getLoggedInUser } from "./services/auth.service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LoggedInUserType } from "./interfaces/general";
import { AuthStatusEnums } from "./enums/general";
import useAuthentication from "./hooks/useAuthentication";
import LoadingScreen from "./screens/LoadingScreen";

const TIME_LIMIT = 0.5;

Asset.loadAsync([
  ...NavigationAssets,
  require("./assets/newspaper.png"),
  require("./assets/bell.png"),
]);

SplashScreen.preventAutoHideAsync();

const linking = {
  enabled: "auto" as const,
  prefixes: [createURL("/")],
};

function AppContent() {
  const { user, authStatus } = useAuthentication();

  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? DarkTheme : DefaultTheme;

  const appState = useRef(AppState.currentState);
  const { setAuthStatus } = useAuthentication();

  async function userLeaveApp() {
    if (!!user)
      AsyncStorage.setItem(
        "user",
        JSON.stringify({ ...user, time: Date.now() }),
      );
  }

  async function userReturnApp() {
    try {
      const userData = await getLoggedInUser();

      if (userData) {
        const currentTime = Date.now();
        const lastActive = (userData as LoggedInUserType).time;
        const timeDiff = (currentTime - lastActive) / (1000 * 60);

        if (timeDiff < TIME_LIMIT) {
          await AsyncStorage.setItem(
            "user",
            JSON.stringify({ ...userData, time: Date.now() }),
          );
        } else {
          setAuthStatus(AuthStatusEnums.UNAUTH);
          await AsyncStorage.setItem("user", JSON.stringify(null));
        }
      } else setAuthStatus(AuthStatusEnums.UNAUTH);
    } catch (error) {
      console.log(error);
    }
  }

  async function coldStart() {
    try {
      const userData = await getLoggedInUser();

      if (!userData) {
        setAuthStatus(AuthStatusEnums.UNAUTH);
        return;
      }

      const currentTime = Date.now();
      const lastActive = (userData as LoggedInUserType).time;
      const timeDiff = (currentTime - lastActive) / (1000 * 60);

      if (timeDiff < TIME_LIMIT) {
        setAuthStatus(AuthStatusEnums.AUTH);
        await AsyncStorage.setItem(
          "user",
          JSON.stringify({ ...userData, time: Date.now() }),
        );
      } else {
        await AsyncStorage.setItem("user", JSON.stringify(null));
        setAuthStatus(AuthStatusEnums.UNAUTH);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    coldStart();

    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (
        appState.current === "active" &&
        nextAppState.match(/inactive|background/)
      )
        userLeaveApp();
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      )
        userReturnApp();

      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    if (authStatus === AuthStatusEnums.UNKNOWN) SplashScreen.hideAsync();
  }, [authStatus]);

  if (authStatus === AuthStatusEnums.UNKNOWN) return <LoadingScreen />;

  const Navigation =
    authStatus === AuthStatusEnums.AUTH ? AuthedNavigation : UnauthedNavigation;

  return (
    <Navigation
      theme={theme}
      linking={linking}
      onReady={() => {
        SplashScreen.hideAsync();
      }}
    />
  );
}

export function App() {
  return (
    <AuthProvider>
      <StatusBar barStyle="dark-content" />
      <AppContent />
    </AuthProvider>
  );
}
