import { View, Text, TextStyle, StyleProp } from "react-native";
import React, { ReactNode } from "react";
import { CustomTextProps } from "../../../interfaces/general";

const Body = ({ children, ...props }: CustomTextProps) => {
  return (
    <Text
      {...props}
      style={{
        fontSize: 18,
        fontWeight: 400,
        lineHeight: 24,
        color: "#707070",
        ...props.style,
      }}
    >
      {children}
    </Text>
  );
};

export default Body;
