import {
  View,
  Text,
  StyleSheet,
  Button,
  Pressable,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import CustomScreen from "../components/ui/CustomScreen";
import useAuthentication from "../hooks/useAuthentication";
import CustomButton from "../components/ui/CustomButton";
import { NavigationProp } from "../interfaces/general";

const HomeScreen = () => {
  const { user, isAuthenticated } = useAuthentication();

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

      <CustomButton>Logout</CustomButton>

      {/* <Button title="Logout" color={"red"} />
      <Pressable style={style.logoutBtn}>
        <Text>Logout</Text>
      </Pressable> */}
      {/* <TouchableWithoutFeedback>logout</TouchableWithoutFeedback> */}
    </CustomScreen>
  );
};

export default HomeScreen;

const style = StyleSheet.create({
  logoutBtn: {
    backgroundColor: "#E5484D",
    color: "white",
  },
});
