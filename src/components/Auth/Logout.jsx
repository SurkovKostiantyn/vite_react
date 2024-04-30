import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '@/firebase.js';
import { signOut } from 'firebase/auth';
import Loading from "@/components/Loading.jsx";

function Logout() {
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            signOut(auth).then(() => {
                console.log('Logged out');
                navigate('/login');
            }).catch((error) => {
                console.log(error);
            });
        }, 2000);
    }, [navigate]);

    return (
        <div className={"main login"}>
            <Loading />
        </div>
    );
}

export default Logout;
