import { View, Text } from "react-native";
import { ReactNode } from "react";
import { CustomTextProps } from "../../../interfaces/general";

const Heading = ({ children, ...props }: CustomTextProps) => {
  return (
    <Text
      {...props}
      style={{
        fontSize: 32,
        fontWeight: 700,
        lineHeight: 40,
        color: "#0C1F17",
        ...props.style,
      }}
    >
      {children}
    </Text>
  );
};

export default Heading;
