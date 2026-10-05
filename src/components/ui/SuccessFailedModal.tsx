import { Dispatch, SetStateAction, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";

import YStack from "./YStack";
import Heading from "./texts/Heading";
import Body from "./texts/Body";
import CustomModal from "./CustomModal";

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
    <CustomModal open={open} setOpen={setOpen}>
      <YStack
        style={{
          backgroundColor: "white",
          padding: 16,
          borderRadius: 10,
          gap: 10,
          alignItems: "center",
        }}
      >
        <Ionicons name={"warning"} size={70} color="#E5484D" />

        <YStack style={{ alignItems: "center" }}>
          <Heading style={{ fontSize: 24 }}>{header}</Heading>

          <Body style={{ textAlign: "center" }}>{description}</Body>
        </YStack>
      </YStack>
    </CustomModal>
  );
};

export default SuccessFailedModal;
