"use client";
import { signOut } from "@/lib/firebase/auth";
import { DecodedIdToken } from "firebase-admin/auth";
import { useUserSession } from "@/hooks/user.session";

export default function Header({ initialUser }: { initialUser: DecodedIdToken | null }) {
    useUserSession(initialUser);
    return (
        <header className="flex justify-end items-center h-16 px-4 bg-white" data-testid="header">
            <button
                onClick={async() => {
                    await signOut();
                    location.reload();
                }}
                className="bg-purple-500 text-white px-4 py-2 rounded-md"
            >
                Logout
            </button>
        </header>
    );
}
