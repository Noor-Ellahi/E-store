//  app/api/cart

import { verifyToken } from "@/app/lib/authJWT/auth";
import { connectDb } from "@/app/lib/mongodb";
import Cart from "@/app/modals/Cart";
import Product from "@/app/modals/Product";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";


export async function GET(req) {

    // This one requires header

    // try {
    //     await connectDb();


    //     const { decoded, error, status } = await verifyToken(req)
    //     if (error) {
    //         return new Response(
    //             JSON.stringify({ error }), { status }
    //         )
    //     }
    //     const userId = decoded.id
    //      console.log("👤 userId:", userId);
    //     // const userId = req.headers.get("user-id");
    //     const cart = await Cart.findOne({ userId }).populate("items.productId");
    //      console.log("👤 userId:", cart);
    //     if (!cart)
    //         return new Response(JSON.stringify({ items: [] }), { status: 200 });

    //     return new Response(JSON.stringify({ success: true, cart }), { status: 200 });
    // }

    // catch (err) {
    //     return new Response(JSON.stringify({ error: "Database connection failed" }), { status: 500 });
    // }

    try {
        await connectDb();

        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value; // token is now available

        if (!token) {
            return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const userCart = await Cart.findOne({ userId: decoded.id }).populate("items.productId");
            console.log(userCart)

            return new Response(JSON.stringify({ cart: userCart?.items || [] }), { status: 200 });
        } catch (err) {
            return new Response(JSON.stringify({ error: "Invalid token" }), { status: 401 });
        }
    }
    catch (error) {

        console.error(error);
        return new Response(JSON.stringify({ error: "Server error" }), {
            status: 500,
        });
    }
}


export async function POST(req) {
    try {
        await connectDb()

        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value; // token is now available
        if (!token) {
            return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
        }

        const { productId, quantity } = await req.json();
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id

        let cart = await Cart.findOne({ userId })

        if (!cart) {
            cart = new Cart({
                userId,
                items: [{ productId, quantity }]
            })
        } else {
            const itemIndex = cart.items.findIndex(
                (item) => item.productId.toString() === productId
            )


            if (itemIndex > -1) {
                cart.items[itemIndex].quantity += quantity
            } else {
                cart.items.push({ productId, quantity })
            }
        }

        await cart.save()

        return new Response(
            JSON.stringify({ message: "Added to cart successfully" }),
            { status: 200 }
        );



    } catch (error) {
        console.error("Cart Error:", error);
        return new Response(
            JSON.stringify({ error: "Something went wrong with Cart!" }),
            { status: 500 }
        )
    }
}


// This one also requires header

// export async function POST(req) {
//     try {
//         await connectDb()


//         const { decoded, error, status } = await verifyToken(req)
//         if (error) {
//             return new Response(
//                 JSON.stringify({ error }), { status }
//             )
//         }
//         // console.log(decoded)
//         const userId = decoded.id


//         const { productId, quantity } = await req.json();

//         let cart = await Cart.findOne({ userId })

//         if (!cart) {
//             cart = new Cart({
//                 userId,
//                 items: [{ productId, quantity }]
//             })
//         } else {
//             const itemIndex = cart.items.findIndex(
//                 (item) => item.productId.toString() === productId
//             )


//             if (itemIndex > -1) {
//                 cart.items[itemIndex].quantity += quantity
//             } else {
//                 cart.items.push({ productId, quantity })
//             }
//         }

//         await cart.save()

//         return new Response(
//             JSON.stringify({ message: "Added to cart successfully" }),
//             { status: 200 }
//         );



//     } catch (error) {
//         console.error("Cart Error:", error);
//         return new Response(
//             JSON.stringify({ error: "Something went wrong with Cart!" }),
//             { status: 500 }
//         )
//     }
// }



