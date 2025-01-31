"use client";

import { initializeApp, getApps } from "firebase/app";
import { firebaseConfig } from "./config";
import { connectAuthEmulator, getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
export const firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
export const storage = getStorage(firebaseApp);

setPersistence(auth, browserLocalPersistence);

if (process.env.NODE_ENV === "development") {
    connectAuthEmulator(auth, "http://localhost:9099");
    connectFirestoreEmulator(db, "localhost", 8080);
    // todo connect all emulators
}
