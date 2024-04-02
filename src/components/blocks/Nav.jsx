import { useContext } from "react";
import { NavLink, Outlet } from "react-router-dom";
import NavHistory from "../NavHistory.jsx";
import { ThemeContext } from '../ThemeContext.jsx';
import { useAuthStatus } from '../../hooks/useAuthStatus'; // Переконайтеся, що ви створили цей хук
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

import { useSelector } from 'react-redux';

function Nav() {
    const { changeStyle, lightMode } = useContext(ThemeContext);
    const { loggedIn } = useAuthStatus();
    const likedStudents = useSelector((state) => state.likes.likedStudents);

    const links = [
        { to: "/", label: "Home" },
        { to: "/contacts", label: "Contacts"},
        { to: "/gallery", label: "Gallery"},
        { to: "/testapi", label: "Test API"},
        { to: "/chat", label: "Chat" },
        { to: "/list", label: "List" },
        { to: "/game", label: "Game" },


        // Умовне відображення посилань
        ...(!loggedIn ? [
            { to: "/login", label: "Login" },
            { to: "/registration", label: "Registration"}
        ] : [
            { to: "/logout", label: "Logout" }
        ])
    ];

    return (
        <nav>
            {links.map(link => (
                <NavLink
                    key={link.to}
                    to={link.to}
                    className={({ isActive }) => isActive ? "active" : ""}
                >
                    {link.label}
                </NavLink>
            ))}
            <button onClick={changeStyle}>
                {lightMode ? <LightModeIcon /> : <DarkModeIcon />}
            </button>
            <span>
                <span>{likedStudents}</span>
            </span>
            <NavHistory />
            <Outlet />
        </nav>
    );
}

export default Nav;
