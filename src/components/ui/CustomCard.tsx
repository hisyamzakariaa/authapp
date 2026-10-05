import YStack from "./YStack";
import { StackProps } from "../../interfaces/general";

const CustomCard = ({ children, ...props }: StackProps) => {
  return (
    <YStack
      {...props}
      style={{
        backgroundColor: "#7A68E4",
        borderRadius: 10,
        padding: 16,
        ...props.style,
      }}
    >
      {children}
    </YStack>
  );
};

export default CustomCard;
