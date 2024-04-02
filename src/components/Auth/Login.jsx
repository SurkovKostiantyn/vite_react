import { useState, useContext } from 'react';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../../firebase.js';
import {ThemeContext} from "../ThemeContext.jsx";

function Login() {
    const { lightMode } = useContext(ThemeContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log('Successfully logged in with email and password');
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleGoogleLogin = async () => {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
            console.log('Successfully logged in with Google');
        } catch (error) {
            console.log(error.message);
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
            <button
                onClick={handleLogin}
            >
                Login with Email
            </button>
            <br />
            <button
                onClick={handleGoogleLogin}
            >
                Login with Google
            </button>
        </div>
    );
}

export default Login;
