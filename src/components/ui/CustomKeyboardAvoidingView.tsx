import { ScrollView, Platform, Keyboard, KeyboardEvent } from "react-native";
import { useEffect, useState } from "react";

import { CustomKeyboardAvoidingViewProps } from "../../interfaces/general";
import YStack from "./YStack";

const CustomKeyboardAvoidingView = ({
  children,
  ...props
}: CustomKeyboardAvoidingViewProps) => {
  const [keyboardHeight, setKeyboardHeight] = useState<number>(0);
  const [isKeyboardVisible, setKeyboardVisible] = useState<boolean>(false);

  useEffect(() => {
    const showEvent =
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow";
    const hideEvent =
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide";

    const onShow = (e: KeyboardEvent) => {
      setKeyboardHeight(e.endCoordinates.height);
      setKeyboardVisible(true);
    };

    const onHide = () => {
      setKeyboardHeight(0);
      setKeyboardVisible(false);
    };

    const showSubscription = Keyboard.addListener(showEvent, onShow);
    const hideSubscription = Keyboard.addListener(hideEvent, onHide);

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return (
    <YStack
      style={{
        flex: 1,
        paddingBottom: isKeyboardVisible ? keyboardHeight : 0,
      }}
    >
      <ScrollView
        {...props}
        contentContainerStyle={{ flexGrow: 1, ...props.contentContainerStyle }}
      >
        {children}
      </ScrollView>
    </YStack>
  );
};

export default CustomKeyboardAvoidingView;
