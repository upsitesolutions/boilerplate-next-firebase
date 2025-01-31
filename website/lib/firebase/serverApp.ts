import "server-only";
import { cookies } from "next/headers";
import { initializeServerApp } from "firebase/app";
import { firebaseConfig } from "./config";
import { adminAuth } from "./adminApp";
import { connectFirestoreEmulator, Firestore, getFirestore } from "firebase/firestore";
import { allowedEmails } from "./auth";

let db: Firestore | null = null;

export async function getServerFirestore() {
    if (!db) {
        const firebaseServerApp = await getServerApp();
        db = getFirestore(firebaseServerApp);
        if (process.env.NODE_ENV === "development") {
            connectFirestoreEmulator(db, "localhost", 8080);
        }
    }
    return db;
}

export async function getAuthenticatedAppForUser() {
    const idToken = (await cookies()).get("__session")?.value;

    const firebaseServerApp = await getServerApp();

    let currentUser = null;
    if (idToken) {
        try {
            const res = await adminAuth.verifyIdToken(idToken);
            const { email } = res;
            if (allowedEmails.includes(email || "")) {
                currentUser = res;
            }
        } catch (error) {
            console.log("Error verifying ID token:", error);
        }
    }

    const dbLocal = await getServerFirestore();

    return { firebaseServerApp, currentUser, db: dbLocal };
}

export async function getServerApp() {
    const idToken = (await cookies()).get("__session")?.value;
    const firebaseServerApp = initializeServerApp(
        firebaseConfig,
        idToken
            ? {
                  authIdToken: idToken,
              }
            : {}
    );

    return firebaseServerApp;
}
