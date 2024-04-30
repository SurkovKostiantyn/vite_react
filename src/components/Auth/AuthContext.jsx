import {createContext, useEffect, useState} from 'react';
import {getAuth, onAuthStateChanged} from 'firebase/auth';
import PropTypes from "prop-types";
import Loading from "@/components/Loading.jsx";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const auth = getAuth();

    useEffect(() => {
        return onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);
        });
    }, [auth]);

    if (loading) {
        return (
            <div className={'main login'}>
                <Loading/>
            </div>
        );
    }

    return (
        <AuthContext.Provider value={{currentUser}}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired
};
