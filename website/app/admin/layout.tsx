import type { Metadata } from "next";
import { getAuthenticatedAppForUser } from "@/lib/firebase/serverApp";
import Header from "@/components/Header";
import Link from "next/link";
import Login from "../../components/Login";

export const metadata: Metadata = {
    title: "Admin Panel",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { currentUser } = await getAuthenticatedAppForUser();

    if (!currentUser) {
        return <Login />;
    }

    return (
        <>
            <Header initialUser={currentUser} />
            <div className="grid grid-cols-12 gap-4">
                <nav className="col-span-2 p-4 ">
                    <ul className="space-y-2">
                        <li>
                            <Link href="/admin">Dashboard</Link>
                        </li>
                    </ul>
                </nav>
                <main className="col-span-10 border-l border-t bg-gray-50 rounded-tl-3xl border-gray-200 h-[calc(100vh-4rem)] overflow-y-auto p-4">
                    {children}
                </main>
            </div>
        </>
    );
}
