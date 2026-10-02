import { Pressable } from "react-native";

import { StackProps } from "../../interfaces/general";

const XStack = ({ children, ...props }: StackProps) => {
  return (
    <Pressable
      {...props}
      style={{
        display: "flex",
        flexDirection: "row",
        ...props.style,
      }}
    >
      {children}
    </Pressable>
  );
};

export default XStack;
