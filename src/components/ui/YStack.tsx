import { View, Text, ViewProps, Pressable } from "react-native";
import { ReactNode } from "react";
import { StackProps } from "../../interfaces/general";

const YStack = ({ children, ...props }: StackProps) => {
  return (
    <Pressable
      {...props}
      style={{ display: "flex", flexDirection: "column", ...props.style }}
    >
      {children}
    </Pressable>
  );
};

export default YStack;
