import {ThemeContext} from "../ThemeContext.jsx";
import {useContext} from "react";


const Contacts = () => {
    const { lightMode } = useContext(ThemeContext);
    return (
        <div
            className={"main" + (lightMode ? " light-mode" : " dark-mode")}
        >
            <h1>Contacts</h1>
        </div>
    )
}

export default Contacts;
