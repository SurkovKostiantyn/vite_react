import { Outlet, NavLink  } from "react-router-dom";
import NavHistory from "./NavHistory.jsx";

function ResponsiveAppBar() {

    return (
        <>
            <NavHistory />
            <nav>
                <NavLink
                    to="/"
                    activeclassname="active"
                    style={{ marginRight: '10px' }}
                >
                    Home
                </NavLink>

                <NavLink
                    to="/contacts"
                    activeclassname="active"
                    style={{ marginRight: '10px' }}
                >
                    Contacts
                </NavLink>

                <NavLink
                    to="/gallery"
                    style={{ marginRight: '10px' }}
                    activeclassname="active"
                >
                    Gallery
                </NavLink>
            </nav>
            <Outlet />
        </>
    );
}
export default ResponsiveAppBar;
