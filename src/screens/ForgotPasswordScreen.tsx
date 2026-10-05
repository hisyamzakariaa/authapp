import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import CustomScreen from "../components/ui/CustomScreen";
import Heading from "../components/ui/texts/Heading";
import CustomInput from "../components/ui/CustomInput";
import YStack from "../components/ui/YStack";
import CustomButton from "../components/ui/CustomButton";
import { NavigationProp } from "../interfaces/general";
import SuccessFailedModal from "../components/ui/SuccessFailedModal";
import CustomKeyboardAvoidingView from "../components/ui/CustomKeyboardAvoidingView";
import useResetPassFormik from "../hooks/useResetPassFormik";
import BackArrow from "../components/ui/BackArrow";

const ForgotPasswordScreen = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const [status, setStatus] = useState<"success" | "failed" | null>(null);

  const { replace } = useNavigation<NavigationProp>();
  const formik = useResetPassFormik();

  const isError = !!formik.errors.email || !!formik.errors.password;

  return (
    <CustomScreen>
      <BackArrow />
      <CustomKeyboardAvoidingView
        contentContainerStyle={{ gap: 50, paddingTop: 30 }}
      >
        <YStack
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            gap: 30,
          }}
        >
          <Heading>Reset Password</Heading>

          <YStack style={{ width: "100%", gap: 20 }}>
            <CustomInput
              formik={formik}
              field="email"
              label="Email"
              containerProps={{ style: { width: "100%" } }}
              inputProps={{
                keyboardType: "email-address",
                placeholder: "Enter your email",
              }}
              initialErrorMsg="Email is required"
            />

            <CustomInput
              formik={formik}
              field="password"
              label="New Password"
              containerProps={{ style: { width: "100%" } }}
              initialErrorMsg="Email is required"
              inputProps={{ placeholder: "Enter your new password" }}
              isPassword
            />

            <CustomButton
              style={{ width: "100%" }}
              disabled={
                !formik.values.email ||
                !formik.values.password ||
                isError ||
                formik.isSubmitting
              }
              onPress={async () => {
                try {
                  await formik.submitForm();
                  setStatus("success");
                  replace("Login");
                } catch (error) {
                  setStatus("failed");
                  setErrorMessage((error as Error).message);
                  setOpen(true);
                }
              }}
            >
              {formik.isSubmitting ? "Resetting..." : "Reset"}
            </CustomButton>
          </YStack>
        </YStack>
      </CustomKeyboardAvoidingView>

      <SuccessFailedModal
        open={open}
        setOpen={setOpen}
        header={status === "success" ? "Success!" : "Process Failed!"}
        description={
          status === "success" ? "Password reset successfully!" : errorMessage
        }
      />
    </CustomScreen>
  );
};

export default ForgotPasswordScreen;
