import { createContext, useEffect, useState } from "react"
import PropTypes from 'prop-types';
import app from "../firebase/firebase.init";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged } from "firebase/auth";



const auth = getAuth(app);

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    console.log(user)
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        })
        return () => {
            unSubscribe();
        }
    }, []);

    const authInfo = { user, loading, createUser }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    )
}

AuthProvider.propTypes = {
    children: PropTypes.node
}

export default AuthProvider