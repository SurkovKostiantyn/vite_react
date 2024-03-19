import { Navigate } from 'react-router-dom';
import { useAuthStatus } from '../hooks/useAuthStatus';
import PropTypes from "prop-types";

function PrivateRoute({ children }) {
    const { loggedIn, checkingStatus } = useAuthStatus();

    if (checkingStatus) {
        return <div>Loading...</div>;
    }

    return loggedIn ? children : <Navigate to="/login" />;
}

export default PrivateRoute;

PrivateRoute.propTypes = {
    children: PropTypes.node.isRequired
}
