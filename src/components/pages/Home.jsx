import Welcome from "../Welcome.jsx";
import {useContext} from "react";
import {ThemeContext} from "../ThemeContext.jsx";

const Home = () => {
    const { lightMode } = useContext(ThemeContext);
    return (
        <div
            className={"main"}
            style={{
                backgroundColor: lightMode ? "white" : "black",
                color: lightMode ? "black" : "white"
            }}
        >
            <Welcome name={"Текст, що завжди видно"} lastname={"Текст, який не видно"}/>
        </div>
    )
}

export default Home;
