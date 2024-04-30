import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '@/firebase.js';
import GoogleIcon from '@mui/icons-material/Google';

function Login() {
    const navigate = useNavigate();

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
            <GoogleIcon onClick={handleGoogleLogin} style={{fontSize: '50px', cursor: 'pointer'}}/>
        </div>
    );
}

export default Login;
