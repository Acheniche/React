import { useAppSelector } from "../../hooks/redux";
import "../../styles/users.css";

const Users = () => {
  const { forms } = useAppSelector((state) => state.formReducer);

  return (
    <div>
      {forms.map((form) => (
        <div key={Math.random()} className="UserForm">
          <h4 key={Math.random()}>
            Name:{form.Name} Age:{form.Age} Email:{form.Email} Password:
            {form.Password} Gender:{form.Gender} Country:{form.Country}
          </h4>
          <div className="img-container">
            <img src={form.Picture as string} alt="" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Users;
