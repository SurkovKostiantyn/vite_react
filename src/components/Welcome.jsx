import { useState } from 'react';
import PropTypes from 'prop-types';

function Welcome({name, lastname}) {

    const [showLastname, setShowLastname] = useState(true);
    const [color, setColor] = useState("red");

    function toggleLastname(){
        setShowLastname(!showLastname);
    }

    function toggleColor(){
        setColor(color === "red" ? "blue" : "red");
    }

    return (
        <>
            <h1
                onMouseOver={toggleLastname}
                onMouseOut={toggleLastname}
                onClick={toggleColor}
                style={{color: color}}
            >
                Hello, {name} {!showLastname && lastname}
            </h1>
        </>
    )
}

Welcome.propTypes = {
    name: PropTypes.string.isRequired,
    lastname: PropTypes.string.isRequired
}

export default Welcome;
