import {useContext } from "react";
import { Outlet, NavLink  } from "react-router-dom";
import NavHistory from "../NavHistory.jsx";
import { ThemeContext } from '../ThemeContext.jsx';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import Button from "@mui/material/Button";

const links = [
    { to: "/", label: "Home", classname: "nav-link" },
    { to: "/contacts", label: "Contacts", classname: "nav-link"  },
    { to: "/gallery", label: "Gallery", classname: "nav-link"  },
    { to: "/testapi", label: "Test API", classname: "nav-link"  },
    { to: "/chat", label: "Chat", classname: "nav-link"  },
    { to: "/list", label: "List" , classname: "nav-link" }
];

function ResponsiveAppBar() {
    const { changeStyle } = useContext(ThemeContext);
    const { lightMode } = useContext(ThemeContext);

    return (
        <div className={"heading"}>
            <nav className={"nav"}>
                {links.map(link => (
                    <NavLink
                        key={link.to}
                        to={link.to}
                        className={link.classname}
                        activeclassname={"active"}
                    >
                        <Button>
                            {link.label}
                        </Button>
                    </NavLink>
                ))}
                <Button onClick={changeStyle}>
                    {
                        lightMode ?
                        <LightModeIcon />
                        :
                        <DarkModeIcon />
                    }
                </Button>
            </nav>
            <NavHistory />
            <Outlet />
        </div>
    );
}
export default ResponsiveAppBar;
