// app/api/order/route.js

import { verifyToken } from "@/app/lib/authJWT/auth";
import { connectDb } from "@/app/lib/mongodb";
import Order from "@/app/modals/Order";
import Product from "@/app/modals/Product";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";


export async function POST(req) {
    try {
        await connectDb()

        // const user = await verifyToken(req)
        // if (!user) {
        //     return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
        // }

        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value; // token is now available

        if (!token) {
            return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // console.log("USER FROM TOKEN:", decoded);
        const { products } = await req.json()

        if (!products || products.length === 0) {
            return new Response(JSON.stringify({ error: "Products and totalPrice are required" }), { status: 400 });
        }


        // 🔥 calculate totalPrice here (IMPORTANT)
        let totalPrice = 0;

        for (const item of products) {
            const product = await Product.findById(item.productId);

            if (!product) {
                return new Response(JSON.stringify({ error: "Product not found" }), { status: 404 });
            }

            totalPrice += product.price * item.quantity;
        }

        const order = await Order.create({
            user: decoded.id,
            products,
            totalPrice,
        });

        return new Response(JSON.stringify(order), { status: 201 });


    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}





export async function GET(req) {
    try {
        // const user = await verifyToken(req);
        // if (!user) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });

        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value; // token is now available

        if (!token) {
            return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const orders = await Order.find({ user: decoded.id }).populate("products.productId").sort({ createdAt: -1 });
        return new Response(JSON.stringify(orders), { status: 200 });
    } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), { status: 500 });
    }

}