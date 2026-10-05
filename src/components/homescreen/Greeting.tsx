import { StyleSheet } from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

import CustomModal from "../ui/CustomModal";
import CustomCard from "../ui/CustomCard";
import XStack from "../ui/XStack";
import Body from "../ui/texts/Body";
import YStack from "../ui/YStack";
import useAuthentication from "../../hooks/useAuthentication";

const Greeting = () => {
  const [open, setOpen] = useState<boolean>(false);

  const { user } = useAuthentication();

  return (
    <>
      <Ionicons
        onPress={() => setOpen(true)}
        name="person-circle-outline"
        size={32}
      />

      <CustomModal open={open} setOpen={setOpen}>
        <CustomCard style={{ backgroundColor: "white", gap: 20 }}>
          <XStack
            style={{ alignItems: "center", justifyContent: "center", gap: 10 }}
          >
            <Ionicons name="person-circle-outline" size={26} />

            <Body
              style={{ ...style.blackBodyFont, fontSize: 20, fontWeight: 600 }}
            >
              User's Profile
            </Body>
          </XStack>

          <YStack>
            {[
              { label: "Name", value: user?.name },
              { label: "Email", value: user?.email },
            ].map((item, index) => (
              <XStack key={index} style={{ gap: 10 }}>
                <Body style={{ ...style.blackBodyFont, fontWeight: 600 }}>
                  {item.label}:
                </Body>
                <Body style={style.blackBodyFont}>{item.value}</Body>
              </XStack>
            ))}
          </YStack>
        </CustomCard>
      </CustomModal>
    </>
  );
};

export default Greeting;

const style = StyleSheet.create({
  blackBodyFont: {
    color: "black",
  },
});
