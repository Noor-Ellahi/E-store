//  app/api/cart

import { verifyToken } from "@/app/lib/authJWT/auth";
import { connectDb } from "@/app/lib/mongodb";
import Cart from "@/app/modals/Cart";
import Product from "@/app/modals/Product";

export async function GET(req) {
    try {
        await connectDb();


        const { decoded, error, status } = await verifyToken(req)
        if (error) {
            return new Response(
                JSON.stringify({ error }), { status }
            )
        }
        const userId = decoded.id
         console.log("👤 userId:", userId);
        // const userId = req.headers.get("user-id");
        const cart = await Cart.findOne({ userId }).populate("items.productId");
         console.log("👤 userId:", cart);
        if (!cart)
            return new Response(JSON.stringify({ items: [] }), { status: 200 });

        return new Response(JSON.stringify({ success: true, cart }), { status: 200 });
    }

    catch (err) {
        return new Response(JSON.stringify({ error: "Database connection failed" }), { status: 500 });
    }
}





export async function POST(req) {
    try {
        await connectDb()


        const { decoded, error, status } = await verifyToken(req)
        if (error) {
            return new Response(
                JSON.stringify({ error }), { status }
            )
        }
        // console.log(decoded)
        const userId = decoded.id
        

        const { productId, quantity } = await req.json();

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



