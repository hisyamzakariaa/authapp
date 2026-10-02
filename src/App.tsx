import { Assets as NavigationAssets } from "@react-navigation/elements";
import {
  createStaticNavigation,
  DarkTheme,
  DefaultTheme,
} from "@react-navigation/native";
import { Asset } from "expo-asset";
import { createURL } from "expo-linking";
import * as SplashScreen from "expo-splash-screen";
import { useColorScheme } from "react-native";

import AuthProvider from "./store/useAuthContext";
import RootNavigation from "./navigation/RootNavigation";
import { useMemo } from "react";

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
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? DarkTheme : DefaultTheme;

  const RootStack = RootNavigation();

  const Navigation = useMemo(
    () => createStaticNavigation(RootStack),
    [RootStack],
  );

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
      <AppContent />
    </AuthProvider>
  );
}
