import React, { useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth } from './Auth.config';
const provider = new GoogleAuthProvider();


const AuthProvider = ({children}) => {

    const [loading,setLoading]=useState(true);
    const [user,setUser]=useState(null);

    const registerEmailPassword=(email,password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth,email,password)

    }

    const signInEmailPassword=(email,password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,password)
    }

    const signInGoogle=()=>{
        setLoading(true)
        return signInWithPopup(auth,provider);
    }

    const authInfo={
        user,
        setUser,
        loading,
        setLoading,
        registerEmailPassword,
        signInGoogle,
        signInEmailPassword


    }

    return <AuthContext value={authInfo}>
        {children}
    </AuthContext>
};

export default AuthProvider;