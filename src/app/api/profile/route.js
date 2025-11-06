// app/api/profile/route.js

// User auth checker

import { verifyToken } from "@/app/lib/authJWT/auth";
import { connectDb } from "@/app/lib/mongodb";
import Cart from "@/app/modals/Cart";
import UserModel from "@/app/modals/User";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";



export async function GET(req) {
    // try {

    //     // await connectDb()

    //     // const authHeader = req.headers.get("authorization")
    //     // if (!authHeader) {
    //     //     return new Response(
    //     //         JSON.stringify({ error: "Invalid or expired token" }),
    //     //         { status: 401 }
    //     //     )
    //     // }

    //     // const token = authHeader.split(" ")[1];

    //     // // verify token:
    //     // let decoded;
    //     // try {
    //     //     decoded = jwt.verify(token, process.env.JWT_SECRET)
    //     // } catch (err) {
    //     //     return new Response(
    //     //         JSON.stringify({ error: "Invalid or expired token" }),
    //     //         { status: 403 }
    //     //     );
    //     // }





    //     await connectDb();

    //     const cookieStore = await cookies();
    //     const token = cookieStore.get("token")?.value; // token is now available

    //     if (!token) {
    //         return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    //     }

    //     try {
    //         const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //         const userCart = await Cart.findOne({ userId: decoded.id }).populate("items.productId");
    //         console.log(userCart)

    //         return new Response(JSON.stringify({ cart: userCart?.items || [] }), { status: 200 });
    //     } catch (err) {
    //         return new Response(JSON.stringify({ error: "Invalid token" }), { status: 401 });
    //     }



    // } catch (error) {

    //     console.error(error);
    //     return new Response(JSON.stringify({ error: "Server error" }), {
    //         status: 500,
    //     });
    // }
    try {
        await connectDb()

        const cookieStore = cookies()
        const token = cookieStore.get("token")?.value;

        if (!token) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 })

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            const user = await UserModel.findById(decoded.id).select("-password")
            return new Response(JSON.stringify({ user }), { status: 200 });
        } catch (error) {

        }
    } catch (err) {
        return new Response(JSON.stringify({ error: "Invalid token" }), { status: 401 });
    }
}



export async function POST(req) {
    // try {
    //     await connectDb()

    //     const cookieStore = await cookies();
    //     const token = cookieStore.get("token")?.value; // token is now available
    //     if (!token) {
    //         return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    //     }

    //     const { productId, quantity } = await req.json();
    //     const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //     const userId = decoded.id

    //     let cart = await Cart.findOne({ userId })

    //     if (!cart) {
    //         cart = new Cart({
    //             userId,
    //             items: [{ productId, quantity }]
    //         })
    //     } else {
    //         const itemIndex = cart.items.findIndex(
    //             (item) => item.productId.toString() === productId
    //         )


    //         if (itemIndex > -1) {
    //             cart.items[itemIndex].quantity += quantity
    //         } else {
    //             cart.items.push({ productId, quantity })
    //         }
    //     }

    //     await cart.save()

    //     return new Response(
    //         JSON.stringify({ message: "Added to cart successfully" }),
    //         { status: 200 }
    //     );



    // } catch (error) {
    //     console.error("Cart Error:", error);
    //     return new Response(
    //         JSON.stringify({ error: "Something went wrong with Cart!" }),
    //         { status: 500 }
    //     )
    // }
}