import {ThemeContext} from "../ThemeContext.jsx";
import {useContext} from "react";


const Contacts = () => {
    const { lightMode } = useContext(ThemeContext);
    return (
        <div
            className={"main"}
            style={{
                backgroundColor: lightMode ? "white" : "black",
                color: lightMode ? "black" : "white"
            }}
        >
            <h1>Contacts</h1>
        </div>
    )
}

export default Contacts;
