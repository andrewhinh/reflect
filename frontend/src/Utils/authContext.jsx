import React, { useContext, useEffect, useState, useMemo } from "react";
import {
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    updatePassword,
    sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../firebase.js";

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        return onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);
        });
    }, []);

    async function signUp(email, password) {
        await createUserWithEmailAndPassword(auth, email, password);
    }

    async function signIn(email, password) {
        await signInWithEmailAndPassword(auth, email, password);
    }

    async function logOut() {
        await signOut(auth);
    }

    async function changePassword(newPassword) {
        if (currentUser) {
            await updatePassword(currentUser, newPassword);
        }
    }

    async function sendChangePasswordEmail(email) {
        await sendPasswordResetEmail(auth, email);
    }

    const value = useMemo(
        () => ({
            currentUser,
            signUp,
            signIn,
            logOut,
            changePassword,
            sendChangePasswordEmail,
        }),
        [currentUser]
    );

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
