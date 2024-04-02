import { useState, useContext } from 'react';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../firebase.js';
import {ThemeContext} from "../ThemeContext.jsx";

function Registration() {
    const { lightMode } = useContext(ThemeContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            console.log('User has been registered');
        } catch (error) {
            console.log(error);
        }
    };

    const handleGoogleRegister = async () => {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
            console.log('User registered with Google');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div
            className={"main" + (lightMode ? " light-mode" : " dark-mode")}
        >
            <input
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <button onClick={handleRegister}>Register with email</button>
            <br />
            <button onClick={handleGoogleRegister}>Register with Google</button>
        </div>
    );
}

export default Registration;
