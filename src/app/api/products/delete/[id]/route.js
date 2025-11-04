// app/api/products/delete/[id]/route.js

import { verifyToken } from "@/app/lib/authJWT/auth";
import { connectDb } from "@/app/lib/mongodb"
import Product from "@/app/modals/Product"


export async function DELETE(req, { params }) {

    try {

        await connectDb()

        const { user, error, status } = await verifyToken(req, true);
        if (error) {
            return new Response(JSON.stringify({ error }), { status });
        }
        if (!user || user.role !== "admin") {
            return new Response(JSON.stringify({ error: "Unauthorized: admin only" }), { status: 403 });
        }

        const { id } = params

        const product = await Product.findByIdAndDelete(
            id
        )

        if (!product) {
            return new Response(
                JSON.stringify({ error: "Product not found!" }),
                { status: 404 }
            )
        }

        return new Response(
            JSON.stringify({ message: "Deleted successfully!" }),
            { status: 200 }
        )

    } catch (error) {

        return new Response(
            JSON.stringify({ error: "Something went wrong while deleting the product!" })
            , { status: 500 }
        )
    }
}