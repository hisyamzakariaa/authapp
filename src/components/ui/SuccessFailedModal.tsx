import { View, Text, Modal } from "react-native";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import YStack from "./YStack";
import Heading from "./texts/Heading";
import Body from "./texts/Body";

const SuccessFailedModal = ({
  open,
  setOpen,
  description,
  header,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  description: string;
  header: string;
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [open]);

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
