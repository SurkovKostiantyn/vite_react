import { useState, createContext } from 'react';
import PropTypes from "prop-types";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [lightMode, setStyle] = useState( true);

    const changeStyle = () => {
        setStyle(!lightMode);
    };

    return (
        <ThemeContext.Provider value={{ lightMode, changeStyle }}>
            {children}
        </ThemeContext.Provider>
    );
};

ThemeProvider.propTypes = {
    children: PropTypes.node.isRequired
};
