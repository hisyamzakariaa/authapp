import { Pressable, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import CustomScreen from "../components/ui/CustomScreen";
import useAuthentication from "../hooks/useAuthentication";
import Heading from "../components/ui/texts/Heading";
import XStack from "../components/ui/XStack";
import { capitalLetter } from "../utils/string-helper";
import CustomCard from "../components/ui/CustomCard";
import Body from "../components/ui/texts/Body";
import YStack from "../components/ui/YStack";
import CustomBorderCard from "../components/ui/CustomBorderCard";
import ServiceListItem from "../components/homescreen/ServiceListItem";
import Greeting from "../components/homescreen/Greeting";

const HomeScreen = () => {
  const { user, logOut } = useAuthentication();

  const dummyContent = [
    { color: "#369EFF", description: "Lorem ipsum dolor sit amet" },
    { color: "#3CB179", description: "Lorem ipsum dolor sit amet" },
    { color: "#F76808", description: "Lorem ipsum dolor sit amet" },
    { color: "#212529", description: "Lorem ipsum dolor sit amet" },
  ];

  const dummyContent2 = [
    "car",
    "airplane",
    "bag-handle",
    "bicycle",
    "boat",
    "bowling-ball",
  ];

  return (
    <>
      <CustomScreen
        style={{
          paddingHorizontal: 0,
        }}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1, gap: 30 }}>
          <XStack style={{ alignItems: "center", paddingHorizontal: 16 }}>
            <XStack
              style={{
                flex: 1,
                alignItems: "center",
                gap: 10,
              }}
            >
              <Greeting />

              <Heading
                numberOfLines={1}
                ellipsizeMode="tail"
                style={{ flex: 1 }}
              >
                Hello,{" "}
                <Heading style={{ color: "#7A68E4" }}>
                  {capitalLetter(user?.name)}!
                </Heading>
              </Heading>
            </XStack>

            <Pressable style={{ padding: 3 }} onPress={() => logOut()}>
              <Ionicons name="log-out-outline" size={24} color="#E5484D" />
            </Pressable>
          </XStack>

          <YStack style={{ flex: 1, gap: 20 }}>
            <YStack style={{ paddingHorizontal: 16 }}>
              <CustomCard style={{ gap: 20, backgroundColor: "#666F8B" }}>
                <Heading
                  style={{
                    fontSize: 24,
                    lineHeight: undefined,
                    color: "white",
                  }}
                >
                  Lorem ipsum
                </Heading>

                <Body style={{ fontSize: 16, color: "white" }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam,
                </Body>
              </CustomCard>
            </YStack>

            <YStack style={{ gap: 10 }}>
              <Heading
                style={{
                  marginHorizontal: 16,
                  fontSize: 18,
                  lineHeight: undefined,
                  color: "black",
                }}
              >
                Top Live
              </Heading>
              <ScrollView
                horizontal
                style={{ flexGrow: 0 }}
                contentContainerStyle={{ gap: 10, paddingHorizontal: 16 }}
                showsHorizontalScrollIndicator={false}
              >
                {dummyContent.map((item, index) => (
                  <CustomBorderCard
                    key={index}
                    style={{
                      borderColor: item.color,
                      height: 100,
                      width: 150,
                      gap: 5,
                    }}
                  >
                    <Body style={{ lineHeight: undefined }}>#{index + 1}</Body>
                    <Body style={{ lineHeight: undefined, fontSize: 14 }}>
                      {item.description}
                    </Body>
                  </CustomBorderCard>
                ))}
              </ScrollView>
            </YStack>

            <YStack style={{ gap: 10 }}>
              <Heading
                style={{
                  marginHorizontal: 16,
                  fontSize: 18,
                  lineHeight: undefined,
                  color: "black",
                }}
              >
                Services
              </Heading>

              <XStack
                style={{ gap: 10, flexWrap: "wrap", paddingHorizontal: 16 }}
              >
                {dummyContent2.map((item, index) => (
                  <ServiceListItem name={item} key={index} />
                ))}
              </XStack>
            </YStack>
          </YStack>
        </ScrollView>
      </CustomScreen>
    </>
  );
};

export default HomeScreen;
