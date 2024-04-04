import { useState } from 'react';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '@/firebase.js';
import GoogleIcon from '@mui/icons-material/Google';
import EmailIcon from '@mui/icons-material/Email';

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log('Successfully logged in with email and password');
            navigate('/');
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleGoogleLogin = async () => {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
            console.log('Successfully logged in with Google');
            navigate('/');
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div className={"main login"} >
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
            <button onClick={handleLogin}>Login with <EmailIcon/></button>
            <br />
            <GoogleIcon onClick={handleGoogleLogin} style={{fontSize: '50px', cursor: 'pointer'}}/>
        </div>
    );
}

export default Login;
