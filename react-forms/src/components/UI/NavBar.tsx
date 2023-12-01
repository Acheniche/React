import { Link } from "react-router-dom";
import "../../styles/navigation.css";

const NavBar = () => {
    return(
        <div className="NavBar">
        <div className="NavBar__links">
            <Link to="/uncontrolledForm">Uncontrolled Form</Link>
            <Link to="/ReactHookForm">React Hook Form</Link>
        </div>
    </div>
    )
};

export default NavBar;