import { Text, StyleSheet } from "react-native";

import CustomScreen from "../components/ui/CustomScreen";
import useAuthentication from "../hooks/useAuthentication";
import CustomButton from "../components/ui/CustomButton";

const HomeScreen = () => {
  const { user, logOut } = useAuthentication();

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
