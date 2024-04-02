import { useContext } from 'react';
import {ThemeContext} from "../ThemeContext.jsx";

const Game = () => {
    const { lightMode } = useContext(ThemeContext);

    return (
        <div
            className={"main" + (lightMode ? " light-mode" : " dark-mode")}
        >
            <h1>Game</h1>
        </div>
    );
};

export default Game;
