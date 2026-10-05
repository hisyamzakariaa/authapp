import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

import CustomScreen from "../components/ui/CustomScreen";
import Heading from "../components/ui/texts/Heading";
import CustomInput from "../components/ui/CustomInput";
import YStack from "../components/ui/YStack";
import CustomButton from "../components/ui/CustomButton";
import Body from "../components/ui/texts/Body";
import XStack from "../components/ui/XStack";
import { NavigationProp } from "../interfaces/general";
import CustomKeyboardAvoidingView from "../components/ui/CustomKeyboardAvoidingView";
import useSignupFormik from "../hooks/useSignupFormik";
import SuccessFailedModal from "../components/ui/SuccessFailedModal";

const SignupScreen = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const { goBack } = useNavigation<NavigationProp>();

  const formik = useSignupFormik();

  const isError =
    !!formik.errors.name || !!formik.errors.email || !!formik.errors.password;

  return (
    <CustomScreen>
      <CustomKeyboardAvoidingView
        contentContainerStyle={{ gap: 30, paddingTop: 30 }}
      >
        <Heading>Sign Up</Heading>

        <YStack
          style={{
            gap: 20,
            flex: 1,
          }}
        >
          <CustomInput
            formik={formik}
            field="name"
            label="Name"
            initialErrorMsg="Name is required"
          />

          <CustomInput
            formik={formik}
            field="email"
            label="Email"
            inputProps={{ keyboardType: "email-address" }}
            initialErrorMsg="Email is required"
          />

          <CustomInput
            field={"password"}
            formik={formik}
            label="Password"
            isPassword
            initialErrorMsg="Password is required"
          />
        </YStack>

        <YStack style={{ gap: 20 }}>
          <XStack style={{ gap: 10, justifyContent: "center" }}>
            <Body>Already have an account?</Body>
            <Body style={{ color: "#236E4A" }} onPress={() => goBack()}>
              Login
            </Body>
          </XStack>

          <CustomButton
            disabled={
              !formik.values.email ||
              !formik.values.name ||
              !formik.values.password ||
              isError ||
              formik.isSubmitting
            }
            onPress={async () => {
              try {
                await formik.submitForm();
                setIsSuccess(true);
              } catch (error) {
                setErrorMessage((error as Error).message);
                setOpen(true);
              }
            }}
          >
            {formik.isSubmitting ? "Signing up..." : "Sign Up"}
          </CustomButton>
        </YStack>
      </CustomKeyboardAvoidingView>

      <SuccessFailedModal
        open={open}
        setOpen={setOpen}
        description={
          isSuccess
            ? "Your account has been registererd successfully."
            : errorMessage
        }
        header={isSuccess ? "Success" : "Failed"}
      />
    </CustomScreen>
  );
};

export default SignupScreen;
