import { Text, Pressable } from "react-native";

import { CustomButtonProps } from "../../interfaces/general";

const CustomButton = ({ children, textStyle, ...props }: CustomButtonProps) => {
  return (
    <Pressable
      {...props}
      style={{
        paddingVertical: 12,
        paddingHorizontal: 16,
        backgroundColor: "#236E4A",
        borderRadius: 8,
        opacity: props.disabled ? 0.7 : 1,
        ...props?.style,
      }}
    >
      <Text
        style={{
          color: "white",
          fontWeight: 500,
          textAlign: "center",
          fontSize: 16,
          ...textStyle,
        }}
      >
        {children}
      </Text>
    </Pressable>
  );
};

export default CustomButton;
