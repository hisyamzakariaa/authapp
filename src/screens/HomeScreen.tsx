import { Text, StyleSheet } from "react-native";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

import CustomScreen from "../components/ui/CustomScreen";
import useAuthentication from "../hooks/useAuthentication";
import CustomButton from "../components/ui/CustomButton";
import { NavigationProp } from "../interfaces/general";

const HomeScreen = () => {
  const { user, isAuthenticated, logOut } = useAuthentication();

  const { navigate } = useNavigation<NavigationProp>();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("Login");
    }
  }, [isAuthenticated]);

  return (
    <CustomScreen
      style={{
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text>{user?.name}</Text>
      <Text>{user?.email}</Text>

      <CustomButton
        style={{ backgroundColor: "#E5484D" }}
        onPress={() => logOut()}
      >
        Logout
      </CustomButton>
    </CustomScreen>
  );
};

export default HomeScreen;

const style = StyleSheet.create({
  logoutBtn: {
    color: "white",
  },
});
