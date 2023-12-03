import * as yup from "yup";
import { FileObject } from "../store/reducers/FormSlice";

export const schema = yup.object().shape({
  Name: yup
    .string()
    .matches(/^[A-Z]/, "First letter should be uppercase")
    .required("Name is required"),
  Age: yup
    .number()
    .positive("Age should be a positive number")
    .integer()
    .required("Age is required"),
  Email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  Password: yup
    .string()
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).*$/,
      "Password must contain at least 1 number, 1 uppercase letter, 1 lowercase letter, and 1 special character",
    )
    .required("Password is required"),
  ConfirmPassword: yup
    .string()
    .oneOf([yup.ref("Password")], "Passwords dont match")
    .required("Confirm password is required"),
  Gender: yup.string().required("Gender is required"),
  AcceptTerms: yup
    .boolean()
    .oneOf([true], "You must accept the terms and conditions"),
  Picture: yup
    .mixed<FileObject | string>()
    .transform((originalValue, originalObject) =>
      originalObject === null ? undefined : originalValue,
    )
    .test("fileFormat", "Unsupported file format", (value) => {
      if (value && value instanceof FileList) {
        const supportedFormats = ["image/png", "image/jpeg", "image/jpg"];
        return supportedFormats.includes(value[0]?.type);
      }
      return true;
    })
    .test("fileSize", "File size is too large", (value) => {
      if (value && value instanceof FileList) {
        const maxSize = 2 * 1024 * 1024;
        return value[0]?.size <= maxSize;
      }
      return true;
    }),
  Country: yup.string().min(1).required("Country is required"),
});
