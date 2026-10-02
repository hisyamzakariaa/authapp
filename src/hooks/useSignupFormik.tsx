import { useFormik } from "formik";
import * as Yup from "yup";

import { UserType } from "../interfaces/general";
import useAuthentication from "./useAuthentication";

const useSignupFormik = () => {
  const { signUp } = useAuthentication();
  return useFormik<UserType>({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      try {
        await signUp(values);
      } catch (error) {
        throw error;
      } finally {
        setSubmitting(false);
      }
    },
  });
};

export default useSignupFormik;
