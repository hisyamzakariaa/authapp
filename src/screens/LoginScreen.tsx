import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import CustomScreen from "../components/ui/CustomScreen";
import Heading from "../components/ui/texts/Heading";
import CustomInput from "../components/ui/CustomInput";
import YStack from "../components/ui/YStack";
import CustomButton from "../components/ui/CustomButton";
import Body from "../components/ui/texts/Body";
import XStack from "../components/ui/XStack";
import { NavigationProp } from "../interfaces/general";
import SuccessFailedModal from "../components/ui/SuccessFailedModal";
import useSignInFormik from "../hooks/useSignInFormik";
import CustomKeyboardAvoidingView from "../components/ui/CustomKeyboardAvoidingView";
import { Ionicons } from "@expo/vector-icons";

const LoginScreen = () => {
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
        <YStack style={{ alignItems: "center", gap: 10 }}>
          <Ionicons name={"logo-twitch"} size={50} color="#7A68E4" />
          <YStack>
            <Heading style={{ textAlign: "center" }}>Welcome</Heading>
            <Body style={{ textAlign: "center" }}>Sign in to continue</Body>
          </YStack>
        </YStack>

        <YStack style={{ flex: 1, gap: 50 }}>
          <YStack
            style={{
              gap: 20,
            }}
          >
            <CustomInput
              formik={formik}
              field="email"
              inputProps={{
                keyboardType: "email-address",
                placeholder: "Email",
              }}
              initialErrorMsg="Email is required"
              icon={<Ionicons name={"person-sharp"} size={22} color="#666" />}
            />

            <CustomInput
              formik={formik}
              field="password"
              isPassword
              initialErrorMsg="Password is required"
              inputProps={{ placeholder: "Password" }}
              icon={
                <Ionicons name={"lock-closed-outline"} size={22} color="#666" />
              }
            />
          </YStack>

          <Body
            style={{ color: "#7A68E4", fontSize: 16, alignSelf: "flex-end" }}
            onPress={() => navigate("ForgotPassword")}
          >
            Forgot Password?
          </Body>
        </YStack>

        <YStack style={{ gap: 20 }}>
          <XStack style={{ gap: 10, justifyContent: "center" }}>
            <Body>Don't have an account?</Body>
            <Body
              style={{ color: "#7A68E4" }}
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

export default LoginScreen;
