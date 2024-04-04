import {useContext, useEffect, useState} from 'react';
import {auth} from "@/firebase.js";
import {onAuthStateChanged} from 'firebase/auth';
import Welcome from "../Welcome.jsx";
import {ThemeContext} from "../ThemeContext.jsx";

const Home = () => {
    const { lightMode } = useContext(ThemeContext);
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Очистити підписку, коли компонент знищується
        return onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
    }, []);

    return (
        <div
            className={"main" + (lightMode ? " light-mode" : " dark-mode")}
        >
            <Welcome name={"Користувач"} lastname={
                user ? user.displayName + " " + user.email : "Анонім" }
            />
            <img width={120} height={120} src={user ? user.photoURL : "https://via.placeholder.com/120"} alt="user" />
        </div>
    );
}

export default Home;
