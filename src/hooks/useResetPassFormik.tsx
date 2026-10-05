import { useFormik } from "formik";
import * as Yup from "yup";

import { UserType } from "../interfaces/general";
import useAuthentication from "./useAuthentication";

const useResetPassFormik = () => {
  const { resetPass } = useAuthentication();

  return useFormik<Omit<UserType, "name">>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);

      await resetPass(values);

      setSubmitting(false);
    },
  });
};

export default useResetPassFormik;
