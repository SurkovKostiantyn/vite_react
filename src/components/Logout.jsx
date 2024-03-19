import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../fb-cfg.js';
import { signOut } from 'firebase/auth';

function Logout() {
    const navigate = useNavigate();

    useEffect(() => {
        signOut(auth).then(() => {
            console.log('Logged out');
            navigate('/login');
        }).catch((error) => {
            console.log(error);
        });
    }, [navigate]);

    return <div>Logging out...</div>;
}

export default Logout;
