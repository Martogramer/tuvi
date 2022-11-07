import { createContext, useContext, useEffect, useState } from 'react';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    signInWithPopup,
    onAuthStateChanged,
    GoogleAuthProvider,
    sendPasswordResetEmail
} from 'firebase/auth'
import { auth } from '../firebase-config'

//acá creamos el contexto para la autenticacion de usuario
export const authContext = createContext();
//y en éste hook llamamos los valores de context
export const useAuth = () => {
    const context = useContext(authContext);
    if (!context) throw new Error("There isn't auth provider")
    return context
}
export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)
    const signup = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }
    const loginWithGoogle = () => {
        const googleProvider = new GoogleAuthProvider()
        return signInWithPopup(auth, googleProvider)
    }
    const logout = () => { signOut(auth) };
    const resetPassword = async (email) => { sendPasswordResetEmail(auth, email) }
//lo hacemos con useEffect xq queremos ejecutar el provider apenas carga la app
    useEffect(() => {
        // esta funcion de firebase queda pendiente de los cambios de auth
        const unsubuscribe = onAuthStateChanged(auth, (currentUser) => {
            console.log({ currentUser })
            setUser(currentUser)
            setLoading(false)
        });
        return () => unsubuscribe()
    }, [])
    return (
        <authContext.Provider
            value={{
                signup,
                login,
                user,
                logout,
                loading,
                loginWithGoogle,
                resetPassword,
            }}>
            {children}
        </authContext.Provider>
    )
}