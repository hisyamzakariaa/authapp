import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FormikProps } from "formik";
import { ReactNode } from "react";
import {
  PressableProps,
  ScrollViewProps,
  StyleProp,
  TextInputProps,
  TextProps,
  ViewProps,
} from "react-native";

export interface UserType {
  name: string;
  email: string;
  password: string;
}

export interface StackProps extends PressableProps {
  children: ReactNode;
}

export interface CustomKeyboardAvoidingViewProps extends ScrollViewProps {
  children: ReactNode;
}

export interface CustomTextProps extends TextProps {
  children: ReactNode;
}

export interface CustomButtonProps extends PressableProps {
  children: ReactNode;
  textStyle?: StyleProp<TextProps>;
}

export type FormikInstance<T> = FormikProps<T>;

export interface CustomInputProps<T> {
  formik: FormikProps<T>;
  field: keyof T & string;
  label: string;
  inputProps?: TextInputProps;
  containerProps?: ViewProps;
  isPassword?: boolean;
  initialErrorMsg?: string;
}

export type RootStackParamList = {
  Login: undefined;
  SignUp: undefined;
  Homescreen: undefined;
};

export type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
