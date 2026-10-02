import { Pressable } from "react-native";

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
