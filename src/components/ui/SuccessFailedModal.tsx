import { Modal } from "react-native";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

import YStack from "./YStack";
import Heading from "./texts/Heading";
import Body from "./texts/Body";

const SuccessFailedModal = ({
  open,
  description,
  header,
  setOpen,
  redirectFunction,
}: {
  open: boolean;
  description: string;
  header: string;
  setOpen: Dispatch<SetStateAction<boolean>>;
  redirectFunction?: () => void;
}) => {
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        setOpen(false);
        if (redirectFunction) redirectFunction();
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [open, redirectFunction]);

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
        <YStack
          style={{
            backgroundColor: "white",
            padding: 16,
            borderRadius: 10,
            gap: 10,
          }}
        >
          <Heading style={{ fontSize: 24 }}>{header}</Heading>

          <Body>{description}</Body>
        </YStack>
      </YStack>
    </Modal>
  );
};

export default SuccessFailedModal;
