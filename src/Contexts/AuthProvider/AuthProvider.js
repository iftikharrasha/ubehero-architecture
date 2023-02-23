import React, { createContext } from 'react';
import useFirebase from '../../hooks/useFirebase';

export const AuthContext = createContext(null);

const AuthProvider = ({children}) => {
    const firebaseContext = useFirebase();
    return (
        <AuthContext.Provider value={firebaseContext}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;