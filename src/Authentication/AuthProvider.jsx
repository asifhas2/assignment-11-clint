import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
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

     const updateUserProfile = (profile) =>{
        return updateProfile(auth.currentUser, profile)
    }

    const logOut = () =>{
    setLoading(true);
    return signOut(auth);
  }

    useEffect(()=>{
        const unSubscribe= onAuthStateChanged(auth,(currentUser)=>{
            setUser(currentUser);
            setLoading(false);
        })
        return ()=>{
            unSubscribe();
        }
    },[])

    const authInfo={
        user,
        setUser,
        loading,
        setLoading,
        registerEmailPassword,
        signInGoogle,
        signInEmailPassword,
        updateUserProfile,
        logOut


    }

    return <AuthContext value={authInfo}>
        {children}
    </AuthContext>
};

export default AuthProvider;