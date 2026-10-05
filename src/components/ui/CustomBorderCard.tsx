import YStack from "./YStack";
import { StackProps } from "../../interfaces/general";

const CustomBorderCard = ({ children, ...props }: StackProps) => {
  return (
    <YStack
      {...props}
      style={{
        borderColor: "#7A68E4",
        borderRadius: 10,
        borderWidth: 1,
        padding: 16,
        ...props.style,
      }}
    >
      {children}
    </YStack>
  );
};

export default CustomBorderCard;
