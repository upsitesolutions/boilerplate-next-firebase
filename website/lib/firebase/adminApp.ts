import { initializeApp, getApps } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

if (!getApps().length) {
    initializeApp();
} else {
    console.log("Firebase admin app already initialized");
}

const adminAuth = getAuth();
const adminFirestore = getFirestore();

export { adminAuth, adminFirestore };
