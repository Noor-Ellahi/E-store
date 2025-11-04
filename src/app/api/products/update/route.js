
import { verifyToken } from "@/app/lib/authJWT/auth";
import { connectDb } from "@/app/lib/mongodb";
import Product from "@/app/modals/Product";



export async function PUT(req, { params }) {

    try {
        await connectDb()

        const { user, error, status } = await verifyToken(req, true);
        if (error) {
            return new Response(JSON.stringify({ error }), { status });
        }
        if (!user || user.role !== "admin") {
            return new Response(JSON.stringify({ error: "Unauthorized: admin only" }), { status: 403 });
        }


        const body = await body.json()
        const updatedProduct = await Product.findByIdAndDelete(
            params.id,
            body,
            { new: true }
        )

        if (!updatedProduct) {
            return new Response(
                JSON.stringify({ error: "Product not found" }),
                { status: 404 }
            );
        }

        return new Response(
            JSON.stringify({ message: "Product updated", product: updatedProduct }),
            { status: 200 }
        );

    } catch (error) {

        return new Response(
            JSON.stringify({ error: "Server side error!" }),
            { status: 500 }
        )
    }
}