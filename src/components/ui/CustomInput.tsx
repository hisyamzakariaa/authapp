import { useState } from "react";
import { Pressable, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Subtitle from "./texts/Subtitle";
import Body from "./texts/Body";
import YStack from "./YStack";
import XStack from "./XStack";
import { CustomInputProps } from "../../interfaces/general";

function CustomInput<T>({
  formik,
  field,
  label,
  inputProps,
  containerProps,
  isPassword,
}: CustomInputProps<T>) {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const fieldValue = String(formik.values[field] ?? "");
  const fieldError = formik.errors[field]
    ? String(formik.errors[field])
    : undefined;
  const isTouched = Boolean(formik.touched[field]);
  const isError = isTouched && Boolean(fieldError);

  return (
    <YStack {...containerProps} style={{ ...containerProps?.style, gap: 10 }}>
      {label && <Body>{label}</Body>}

      <XStack style={{ alignItems: "center" }}>
        <TextInput
          placeholder="Fill in here"
          placeholderTextColor={"#7E7E7E"}
          autoCapitalize={"none"}
          value={fieldValue}
          secureTextEntry={isPassword && !showPassword}
          onChangeText={(val) => {
            formik.setFieldValue(field, val);
          }}
          onBlur={(e) => {
            formik.handleBlur(field)(e);
            setIsFocused(false);
          }}
          onFocus={() => setIsFocused(true)}
          {...inputProps}
          style={{
            fontSize: 16,
            borderRadius: 7,
            padding: 10,
            backgroundColor: isFocused
              ? "#FFFFFF"
              : isError
                ? "#FFF9F9"
                : "#FFFFFF",
            color: isFocused ? "#0C1F17" : isError ? "#E5484D" : "#0C1F17",
            borderWidth: 1,
            borderColor: isFocused
              ? "#AC9FED"
              : isError
                ? "#F2555A"
                : "#EDEDED",
            flex: 1,
            ...inputProps?.style,
          }}
        />

        {isPassword && (
          <Pressable
            style={{
              position: "absolute",
              right: 10,
              padding: 5,
            }}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Ionicons
              name={showPassword ? "eye-off-outline" : "eye-outline"}
              size={22}
              color="#666"
            />
          </Pressable>
        )}
      </XStack>

      {isError && (
        <Subtitle style={{ color: "#E5484D" }}>{fieldError}</Subtitle>
      )}
    </YStack>
  );
}

export default CustomInput;
