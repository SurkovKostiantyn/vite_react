import { useContext } from "react";
import { NavLink, Outlet } from "react-router-dom";
import NavHistory from "../NavHistory.jsx";
import { ThemeContext } from '../ThemeContext.jsx';
import { useAuthStatus } from '../../hooks/useAuthStatus'; // Переконайтеся, що ви створили цей хук
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

function Nav() {
    const { changeStyle, lightMode } = useContext(ThemeContext);
    const { loggedIn } = useAuthStatus();

    const links = [
        { to: "/", label: "Home" },
        { to: "/contacts", label: "Contacts"},
        { to: "/gallery", label: "Gallery"},
        { to: "/testapi", label: "Test API"},
        { to: "/chat", label: "Chat" },
        { to: "/list", label: "List" },
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
            <NavHistory />
            <Outlet />
        </nav>
    );
}

export default Nav;
