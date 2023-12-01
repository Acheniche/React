import NavBar from "../components/UI/NavBar";
import { useAppDispatch, useAppSelector } from "../hooks/redux";

function MainPage() {
const dispatch = useAppDispatch();
const {forms} = useAppSelector(state =>state.formReducer);
console.log(forms);
    return(
        <div className="MainPage">
            <NavBar/>
        </div>
    )
}

export default MainPage;