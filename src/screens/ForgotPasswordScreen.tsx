import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import CustomScreen from "../components/ui/CustomScreen";
import Heading from "../components/ui/texts/Heading";
import CustomInput from "../components/ui/CustomInput";
import YStack from "../components/ui/YStack";
import CustomButton from "../components/ui/CustomButton";
import { NavigationProp } from "../interfaces/general";
import SuccessFailedModal from "../components/ui/SuccessFailedModal";
import useSignInFormik from "../hooks/useSignInFormik";
import CustomKeyboardAvoidingView from "../components/ui/CustomKeyboardAvoidingView";

const ForgotPasswordScreen = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const [status, setStatus] = useState<"success" | "failed" | null>(null);

  const { navigate } = useNavigation<NavigationProp>();
  const formik = useSignInFormik();

  const isError = !!formik.errors.email || !!formik.errors.password;

  return (
    <CustomScreen>
      <CustomKeyboardAvoidingView
        contentContainerStyle={{ gap: 50, paddingTop: 30 }}
      >
        <YStack
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            gap: 50,
          }}
        >
          <Heading>Reset Password</Heading>

          <YStack style={{ width: "100%", gap: 20 }}>
            <CustomInput
              formik={formik}
              field="email"
              label="Email"
              containerProps={{ style: { width: "100%" } }}
              inputProps={{ keyboardType: "email-address" }}
              initialErrorMsg="Email is required"
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
                } catch (error) {
                  setStatus("failed");
                  setErrorMessage((error as Error).message);
                  setOpen(true);
                }
              }}
            >
              {formik.isSubmitting ? "Logging in..." : "Login"}
            </CustomButton>
          </YStack>
        </YStack>
      </CustomKeyboardAvoidingView>

      <SuccessFailedModal
        open={open}
        setOpen={setOpen}
        header={
          status === "success" ? "Login Successfully!" : "Failed to login!"
        }
        description={
          status === "success" ? "Login Successfully!" : errorMessage
        }
      />
    </CustomScreen>
  );
};

export default ForgotPasswordScreen;
