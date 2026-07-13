import { createContext, useContext, useReducer } from "react";
import { authReducer } from "../reducer/auth-reducer.jsx";

const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const parseStoredValue = (key) => {
        const storedValue = localStorage.getItem(key);

        if (!storedValue) return "";

        try {
            return JSON.parse(storedValue);
        } catch {
            return "";
        }
    };

    const initialState = {
        email: parseStoredValue('email'),
        password: parseStoredValue('password'),
        token: parseStoredValue('token')
    }

    const [{email, password, token}, authDispatch] = useReducer(authReducer, initialState);

    return (
        <AuthContext.Provider value={{email, password, token, authDispatch}}>
            { children }
        </AuthContext.Provider>
    )
}

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };