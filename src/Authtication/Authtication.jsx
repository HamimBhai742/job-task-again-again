import React, { createContext, useEffect, useState } from 'react';
import app from '../Firebase/FirebaseConfig';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithCredential, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';

export const AuthContext = createContext(null)
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loder, setLoder] = useState(true)
    const googleProvider = new GoogleAuthProvider()
    const auth = getAuth(app)
    const registerUser = (email, password) => {
        setLoder(true)
        console.log(email, password);
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const updateUserProfile = (photo, name) => {
        setLoder(true)
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo
        })
    }

    const loginUser = (email, password) => {
        setLoder(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const googleLogin = () => {
        return signInWithPopup(auth, googleProvider)
    }
    const logoutUser = () => {
        signOut(auth)
    }

    useEffect(() => {
        const UnSubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
            setLoder(false)
        })
        return () => {
            UnSubscribe()
        }
    }, [])
    const userInfo = {
        registerUser,
        updateUserProfile,
        user,
        logoutUser,
        loginUser,
        googleLogin,
        loder
    }

    return (
        <AuthContext.Provider value={userInfo}>
            {
                children
            }
        </AuthContext.Provider>
    )
};

export default AuthProvider;