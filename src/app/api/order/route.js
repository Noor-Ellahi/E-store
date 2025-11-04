// app/api/order/route.js

import { verifyToken } from "@/app/lib/authJWT/auth";
import { connectDb } from "@/app/lib/mongodb";
import Order from "@/app/modals/Order";


export async function POST(req) {
    try {
        await connectDb()

        const user = await verifyToken(req)
        if (!user) {
            return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
        }


        const { products, totalPrice } = await req.json()

        if (!products || products.length === 0 || !totalPrice) {
            return new Response(JSON.stringify({ error: "Products and totalPrice are required" }), { status: 400 });
        }


        const order = await Order.create({
            user: user._id,
            products,
            totalPrice,
        });

        return new Response(JSON.stringify(order), { status: 201 });


    } catch (error) {
        return new Response(JSON.stringify({ error: "Server side Error" }), { status: 500 });
    }
}





export async function GET(req) {
    try {
        const user = await verifyToken(req);
        if (!user) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });

        const orders = await Order.find({ user: user._id }).populate("products.productId");
        return new Response(JSON.stringify(orders), { status: 200 });
    } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), { status: 500 });
    }

}