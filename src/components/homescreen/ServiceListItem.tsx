import { Ionicons } from "@expo/vector-icons";
import { useWindowDimensions } from "react-native";

import CustomCard from "../ui/CustomCard";

const ServiceListItem = ({ name }: { name: any }) => {
  const { width } = useWindowDimensions();

  const size = (width - 16 * 2 - 10 * 3) / 4;

  return (
    <CustomCard
      style={{
        height: size,
        width: size,
        maxHeight: 80,
        maxWidth: 80,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Ionicons color={"white"} name={name} size={36} />
    </CustomCard>
  );
};

export default ServiceListItem;
