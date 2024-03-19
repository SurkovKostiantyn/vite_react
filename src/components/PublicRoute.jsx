import { Navigate } from 'react-router-dom';
import { useAuthStatus } from '../hooks/useAuthStatus';
import PropTypes from "prop-types";

function PublicRoute({ children }) {
    const { loggedIn, checkingStatus } = useAuthStatus();

    if (checkingStatus) {
        return <div>Loading...</div>;
    }

    return loggedIn ? <Navigate to="/" /> : children;
}

export default PublicRoute;

PublicRoute.propTypes = {
    children: PropTypes.node.isRequired
}
