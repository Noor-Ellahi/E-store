import { connectDb } from "@/app/lib/mongodb";
import Cart from "@/app/modals/Cart";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function POST() {


    try {
        await connectDb()
        const cookieStore = await cookies()
        const token = cookieStore.get('token')?.value

        if (!token) {
            return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const userCart = await Cart.findOne({ userId: decoded.id })

        if (!userCart) {
            return new Response(JSON.stringify({ error: "Carts doesnot Exist" }), { status: 404 })
        }
        userCart.items = [];
        await userCart.save()
        return new Response(JSON.stringify({ message: "Cart emptied successfully!" }), { status: 200 })


    } catch (error) {
        console.error("Error emptying cart:", error);
        return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
    }
}
