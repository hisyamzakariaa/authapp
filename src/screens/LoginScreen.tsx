import { useState } from "react";

import CustomScreen from "../components/ui/CustomScreen";
import Heading from "../components/ui/texts/Heading";
import CustomInput from "../components/ui/CustomInput";
import YStack from "../components/ui/YStack";
import CustomButton from "../components/ui/CustomButton";
import useAuthentication from "../hooks/useAuthentication";
import { useNavigation } from "@react-navigation/native";
import Subtitle from "../components/ui/texts/Subtitle";
import Body from "../components/ui/texts/Body";
import XStack from "../components/ui/XStack";
import { NavigationProp, UserType } from "../interfaces/general";
import SuccessFailedModal from "../components/ui/SuccessFailedModal";
import useSignInFormik from "../hooks/useSignInFormik";
import CustomKeyboardAvoidingView from "../components/ui/CustomKeyboardAvoidingView";

const LoginScreen = () => {
  const { login } = useAuthentication();
  const [open, setOpen] = useState<boolean>(false);
  const [data, setData] = useState<Omit<UserType, "name">>({
    email: "",
    password: "",
  });
  const [status, setStatus] = useState<"success" | "failed" | null>(null);

  const { navigate, replace } = useNavigation<NavigationProp>();
  const formik = useSignInFormik();

  const isError = !!formik.errors.email || !!formik.errors.password;

  return (
    <CustomScreen>
      <CustomKeyboardAvoidingView
        contentContainerStyle={{ gap: 50, paddingTop: 30 }}
      >
        <Heading>Login</Heading>

        <YStack
          style={{
            gap: 20,
            flex: 1,
          }}
        >
          <CustomInput
            formik={formik}
            field="email"
            label="Email"
            inputProps={{ keyboardType: "email-address" }}
            initialErrorMsg="Email is required"
          />

          <CustomInput
            formik={formik}
            field="password"
            label="Password"
            isPassword
            initialErrorMsg="Password is required"
          />
        </YStack>

        <YStack style={{ gap: 20 }}>
          <XStack style={{ gap: 10, justifyContent: "center" }}>
            <Body>Don't have an account?</Body>
            <Body
              style={{ color: "#236E4A" }}
              onPress={() => navigate("SignUp")}
            >
              Sign Up
            </Body>
          </XStack>

          <CustomButton
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
                replace("Homescreen");
              } catch (error) {
                console.log(error, "sinini");
                setStatus("failed");
                setOpen(true);
              }
            }}
          >
            {formik.isSubmitting ? "Logging in..." : "Login"}
          </CustomButton>
        </YStack>
      </CustomKeyboardAvoidingView>

      <SuccessFailedModal
        open={open}
        setOpen={setOpen}
        header={
          status === "success" ? "Login Successfully!" : "Failed to login!"
        }
        description={
          status === "success"
            ? "Login Successfully!"
            : "Please make sure that your email and password are correct."
        }
      />
    </CustomScreen>
  );
};

export default LoginScreen;
