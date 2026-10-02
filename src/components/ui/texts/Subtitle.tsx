import { Text } from "react-native";

import { CustomTextProps } from "../../../interfaces/general";

const Subtitle = ({ children, ...props }: CustomTextProps) => {
  return (
    <Text
      {...props}
      style={{ fontSize: 12, fontWeight: 400, lineHeight: 16, ...props.style }}
    >
      {children}
    </Text>
  );
};

export default Subtitle;
