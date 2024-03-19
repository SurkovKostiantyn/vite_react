import { useState, useEffect } from 'react';
import { auth } from '../fb-cfg.js';
import { onAuthStateChanged } from 'firebase/auth';

export function useAuthStatus() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [checkingStatus, setCheckingStatus] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setLoggedIn(true);
            } else {
                setLoggedIn(false);
            }
            setCheckingStatus(false);
        });

        return () => unsubscribe();
    }, []);

    return { loggedIn, checkingStatus };
}
