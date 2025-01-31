import { getAuthenticatedAppForUser } from "@/lib/firebase/serverApp";

export const dynamic = "force-dynamic";

export default async function Home() {
    // const { currentUser } = await getAuthenticatedAppForUser();

    // if (!currentUser) {
    //     return <div>Not authenticated</div>;
    // }

    return (
        <div className="">
            <h1>Hello World</h1>
        </div>
    );
}
