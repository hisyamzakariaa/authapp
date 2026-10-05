import { Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import XStack from "./XStack";
import Body from "./texts/Body";
import { useNavigation } from "@react-navigation/native";

const BackArrow = ({ caption }: { caption?: string }) => {
  const { goBack } = useNavigation();

  return (
    <XStack>
      <Pressable>
        <Ionicons
          style={{ padding: 5 }}
          name={"arrow-back"}
          size={22}
          color="black"
          onPress={() => goBack()}
        />
      </Pressable>

      {caption && <Body>{caption}</Body>}
    </XStack>
  );
};

export default BackArrow;
