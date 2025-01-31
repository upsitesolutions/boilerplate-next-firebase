import { useState, useEffect } from "react";

import { allowedEmails, onAuthStateChanged, onIdTokenChanged } from "../lib/firebase/auth";
import { DecodedIdToken } from "firebase-admin/auth";
import { User } from "firebase/auth";
import nookies from "nookies";

export function useUserSession(initialUser: DecodedIdToken | null) {
    const [user, setUser] = useState<DecodedIdToken | User | null>(initialUser);

    useEffect(() => {
        onIdTokenChanged(async (user) => {
            if (!user) {
                return;
            }
            const token = await user.getIdToken();
            let { email } = user;
            if (allowedEmails.includes(email || "")) {
                setUser(user);
                nookies.destroy(null, "__session");
                nookies.set(null, "__session", token, {
                    path: "/",
                });
            }
        }).then((unsubscribe) => {
            return () => unsubscribe();
        });
    }, []);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged((authUser) => {
            if (allowedEmails.includes(authUser?.email || "")) {
                setUser(authUser);
            }
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        onAuthStateChanged((authUser) => {
            if (authUser) {
                if (!allowedEmails.includes(authUser.email || "")) {
                    setUser(null);
                    nookies.destroy(null, "__session");
                    nookies.set(null, "__session", "", { path: "/" });
                    return;
                }
            } else {
                setUser(null);
                nookies.destroy(null, "__session");
                nookies.set(null, "__session", "", { path: "/" });
            }
        });
    }, [user]);

    return user;
}
