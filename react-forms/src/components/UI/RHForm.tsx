import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormsData, postSlice } from "../../store/reducers/FormSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { useNavigate } from "react-router-dom";
import { ChangeEvent, useState } from "react";
import { convertFileToBase64 } from "../convertation";
import { schema } from "../shema";

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
