import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormsData, postSlice } from "../../store/reducers/FormSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { useNavigate } from "react-router-dom";
import { ChangeEvent, useEffect, useState } from "react";
import { convertFileToBase64 } from "../convertation";
import { schema } from "../shema";

const Form = () => {
  const [convertedImageData, setConvertedImageData] = useState<string | null>(
    null,
  );

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { setUser } = postSlice.actions;
  const { forms } = useAppSelector((state) => state.formReducer);

  useEffect(() => {
    register("Name");
    register("Age");
    register("Email");
    register("Password");
    register("ConfirmPassword");
    register("Gender");
    register("Country");
    register("AcceptTerms");
    register("Picture");
  }, [register]);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const base64String = await convertFileToBase64(files[0]);
      setConvertedImageData(base64String);
    }
  };

  const onSubmit = (data: FormsData) => {
    if (convertedImageData) {
      data.Picture = convertedImageData;
    }
    dispatch(setUser(data));
    navigate("/main");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        placeholder="Name..."
        onChange={(e) => setValue("Name", e.target.value)}
      />
      <p>{errors.Name?.message}</p>
      <input
        type="number"
        placeholder="Age..."
        onChange={(e) => setValue("Age", parseInt(e.target.value, 10))}
      />
      <p>{errors.Age?.message}</p>
      <input
        type="text"
        placeholder="Email..."
        onChange={(e) => setValue("Email", e.target.value)}
      />
      <p>{errors.Email?.message}</p>
      <input
        type="password"
        placeholder="Password..."
        onChange={(e) => setValue("Password", e.target.value)}
      />
      <p>{errors.Password?.message}</p>
      <input
        type="password"
        placeholder="Confirm password..."
        onChange={(e) => setValue("ConfirmPassword", e.target.value)}
      />
      <p>{errors.ConfirmPassword?.message}</p>
      <fieldset>
        <legend>Select your gender</legend>
        <input
          type="radio"
          id="gender1"
          value="Male"
          onChange={() => setValue("Gender", "Male")}
        />
        <label htmlFor="gender1">Male</label>
        <input
          type="radio"
          id="gender2"
          value="Female"
          onChange={() => setValue("Gender", "Female")}
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
        onChange={(e) => setValue("Country", e.target.value)}
      />
      <datalist id="country">
        <option value="text"></option>
        {forms.map((form) => (
          <option key={Math.random()} value={form.Country}></option>
        ))}
      </datalist>
      <p>{errors.Country?.message}</p>
      <label>
        <input
          type="checkbox"
          onChange={(e) => setValue("AcceptTerms", e.target.checked)}
        />
        accept T&C
      </label>
      <p>{errors.AcceptTerms?.message}</p>
      <input type="submit" />
    </form>
  );
};

export default Form;
