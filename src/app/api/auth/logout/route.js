import { cookies } from "next/headers";


export async function POST() {
    try {
        (await cookies()).delete("token")
        return new Response(JSON.stringify({ message: "Logged out" }), { status: 200 });
    } catch (error) {
        return new Response(
            JSON.stringify({ error: "Server Error" }),
            { status: 500 }
        )
    }
}