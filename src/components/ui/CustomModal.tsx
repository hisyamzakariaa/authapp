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
      backdropColor={"transparent"}
      visible={open}
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
        }}
        onPress={() => setOpen(false)}
      >
        {children}
      </YStack>
    </Modal>
  );
};

export default CustomModal;
