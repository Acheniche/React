import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  FileObject,
  FormsData,
  postSlice,
} from "../../store/reducers/FormSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { useNavigate } from "react-router-dom";
import { ChangeEvent, useState } from "react";
import { convertFileToBase64 } from "../convertation";

const Form = () => {
  const [convertedImageData, setConvertedImageData] = useState<string | null>(
    null,
  );

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files: FileList | null = e.target.files;
    if (files && files.length > 0) {
      const base64String = await convertFileToBase64(files[0]);
      setConvertedImageData(base64String);
    }
  };

  const schema = yup.object().shape({
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
      .test({
        name: "fileFormat",
        message: "Unsupported file format",
        test: (value) => {
          if (value && value instanceof FileList) {
            const supportedFormats = ["image/png", "image/jpeg", "image/jpg"];
            return supportedFormats.includes(value[0]?.type);
          }
          return true;
        },
      })
      .test({
        name: "fileSize",
        message: "File size is too large",
        test: (value) => {
          if (value && value instanceof FileList) {
            const maxSize = 2 * 1024 * 1024;
            return value[0]?.size <= maxSize;
          }
          return true;
        },
      }),
    Country: yup.string().min(1).required("Country is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "all",
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { setUser } = postSlice.actions;
  const { forms } = useAppSelector((state) => state.formReducer);

  const onSubmit = (data: FormsData) => {
    if (convertedImageData) {
      data.Picture = convertedImageData;
    }
    dispatch(setUser(data));
    navigate("/main");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" placeholder="Name..." {...register("Name")} />
      <p>{errors.Name?.message}</p>
      <input type="number" placeholder="Age..." {...register("Age")} />
      <p>{errors.Age?.message}</p>
      <input type="text" placeholder="Email..." {...register("Email")} />
      <p>{errors.Email?.message}</p>
      <input
        type="password"
        placeholder="Password..."
        {...register("Password")}
      />
      <p>{errors.Password?.message}</p>
      <input
        type="password"
        placeholder="Confirm password..."
        {...register("ConfirmPassword")}
      />
      <p>{errors.ConfirmPassword?.message}</p>
      <fieldset>
        <legend>Select your gender</legend>
        <input type="radio" id="gender1" value="Male" {...register("Gender")} />
        <label htmlFor="gender1">Male</label>
        <input
          type="radio"
          id="gender2"
          value="Female"
          {...register("Gender")}
        />
        <label htmlFor="gender2">Female</label>
      </fieldset>
      <p>{errors.Gender?.message}</p>
      <label htmlFor="Picture">Upload Picture:</label>
      <input
        type="file"
        id="Picture"
        name="Picture"
        onChange={handleFileChange}
      />
      <p>{errors.Picture?.message}</p>
      <label htmlFor="country">Country:</label>
      <input
        placeholder="Select Country"
        type="text"
        list="country"
        {...register("Country")}
      />
      <datalist id="country">
        <option value="text"></option>
        {forms.map((form) => (
          <option key={Math.random()} value={form.Country}></option>
        ))}
      </datalist>
      <p>{errors.Country?.message}</p>
      <label>
        <input type="checkbox" {...register("AcceptTerms")} />
        accept T&C
      </label>
      <p>{errors.AcceptTerms?.message}</p>
      <input type="submit" disabled={!isValid} />
    </form>
  );
};

export default Form;
