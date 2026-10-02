import { StyleProp, ViewStyle } from "react-native";
import { ReactNode } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const CustomScreen = ({
  children,
  style,
}: {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}) => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        display: "flex",
        padding: 16,
        backgroundColor: "white",
        ...style,
      }}
    >
      {children}
    </SafeAreaView>
  );
};

export default CustomScreen;
