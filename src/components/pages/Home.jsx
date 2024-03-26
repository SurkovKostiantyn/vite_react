import {useContext, useEffect, useState} from 'react';
import {auth} from '../../fb-cfg.js';
import {onAuthStateChanged} from 'firebase/auth';
import Welcome from "../Welcome.jsx";
import {ThemeContext} from "../ThemeContext.jsx";

const Home = () => {
    const { lightMode } = useContext(ThemeContext);
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Очистити підписку, коли компонент знищується
        return onAuthStateChanged(auth, (currentUser) => {
            console.log(currentUser);
            setUser(currentUser);
        });
    }, []);

    return (
        <div
            className={"main"}
            style={{
                backgroundColor: lightMode ? "white" : "black",
                color: lightMode ? "black" : "white"
            }}
        >
            <Welcome name={"Користувач"} lastname={
                user ? user.displayName + " " + user.email : "Анонім" }
            />
            <img width={120} height={120} src={user ? user.photoURL : "https://via.placeholder.com/120"} alt="user" />
        </div>
    );
}

export default Home;
