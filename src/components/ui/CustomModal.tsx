import { Modal } from "react-native";
import { Dispatch, ReactNode, SetStateAction } from "react";

import YStack from "./YStack";

const CustomModal = ({
  children,
  open,
  setOpen,
}: {
  children: ReactNode;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <Modal
      transparent
      animationType="fade"
      visible={open}
      statusBarTranslucent
      onRequestClose={() => {
        setOpen(false);
      }}
    >
      <YStack
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          padding: 16,
          backgroundColor: "rgba(0, 0, 0, 0.7)",
        }}
        onPress={(e) => {
          e.stopPropagation();
          setOpen(false);
        }}
      >
        {children}
      </YStack>
    </Modal>
  );
};

export default CustomModal;
