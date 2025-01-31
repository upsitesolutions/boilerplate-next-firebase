"use client";
import { signInWithGoogle } from "@/lib/firebase/auth";
import { useUserSession } from "@/hooks/user.session";

function Login() {
    const user = useUserSession(null);
    return (
        <div className="text-center h-screen flex items-center justify-center">
            <button
                onClick={async () => {
                    try {
                        await signInWithGoogle();
                        location.reload();
                    } catch (error) {}
                }}
                className="bg-purple-500 text-white px-4 py-2 rounded-md"
            >
                Sign in with Google
            </button>
            {/* add more login options... */}
        </div>
    );
}

export default Login;
