import { useContext } from "react"
import { AuthContext } from "../providers/AuthProvider"
import { Navigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import PropTypes from 'prop-types';


const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);

    if (loading) {
        return <LoadingSpinner />
    }

    if (user) {
        return children;
    }

    return <Navigate to={'/login'} />
}

PrivateRoute.propTypes = {
    children: PropTypes.node
}

export default PrivateRoute