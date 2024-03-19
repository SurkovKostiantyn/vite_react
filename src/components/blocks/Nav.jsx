import {useContext } from "react";
import { Outlet, NavLink  } from "react-router-dom";
import NavHistory from "../NavHistory.jsx";
import { ThemeContext } from '../ThemeContext.jsx';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

const links = [
    { to: "/", label: "Home" },
    { to: "/contacts", label: "Contacts"},
    { to: "/gallery", label: "Gallery"},
    { to: "/testapi", label: "Test API"},
    { to: "/chat", label: "Chat" },
    { to: "/list", label: "List" }
];

function Nav() {
    const { changeStyle } = useContext(ThemeContext);
    const { lightMode } = useContext(ThemeContext);

    return (
        <nav>
            {links.map(link => (
                <NavLink
                    key={link.to}
                    to={link.to}
                    activeclassname={"active"}
                >
                    {link.label}
                </NavLink>
            ))}
            {lightMode ? <LightModeIcon onClick={changeStyle}/> : <DarkModeIcon onClick={changeStyle}/>}
            <NavHistory />
            <Outlet />
        </nav>
    );
}
export default Nav;
