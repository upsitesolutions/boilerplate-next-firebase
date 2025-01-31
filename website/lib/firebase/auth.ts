import {
    GoogleAuthProvider,
    signInWithPopup,
    onAuthStateChanged as _onAuthStateChanged,
    NextOrObserver,
    User,
    onIdTokenChanged as _onIdTokenChanged,
} from "firebase/auth";
import { auth } from "./clientApp";

export function onAuthStateChanged(cb: NextOrObserver<User>) {
    return _onAuthStateChanged(auth, cb);
}

export async function onIdTokenChanged(cb: NextOrObserver<User>) {
    return _onIdTokenChanged(auth, cb);
}

export async function signInWithGoogle() {
    const provider = new GoogleAuthProvider();

    try {
        await signInWithPopup(auth, provider);
    } catch (error) {
        console.error("Error signing in with Google", error);
    }
}

export async function signOut() {
    try {
        return auth.signOut();
    } catch (error) {
        console.error("Error signing out with Google", error);
    }
}

// Add more allowed emails to restrict access to the app or remove this logic if you want to allow all emails
export const allowedEmails = [""];
