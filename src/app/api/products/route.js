// app/api/products/route.js

// Add a product


import { connectDb } from "@/app/lib/mongodb";
import Product from "../../modals/Product";
import { verifyToken } from "../../lib/authJWT/auth";


function makeSlug(name) {
    return name
        .toString()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
}


export async function POST(req) {


    try {
        await connectDb()

        const { user, error, status } = await verifyToken(req, true);
        if (error) {
            return new Response(JSON.stringify({ error }), { status });
        }
        if (user.role !== "admin") {
            return new Response(JSON.stringify({ error: "Unauthorized: admin only" }), { status: 403 });
        }

        const body = await req.json()
        const { name, description = "", price, category = "", stock = 0, images = [] } = body;

        if (!name || price === undefined || price === null) {
        // if (!name || !price) {
            return new Response(JSON.stringify({ error: "Missing required fields: name and price" }), { status: 400 });
        }


        let slugBase = makeSlug(name);
        let slug = slugBase;
        let counter = 1;
        while (await Product.findOne({ slug })) {
            slug = `${slugBase}-${counter++}`;
        }


        const product = await Product.create({
            name,
            slug,
            description,
            price,
            category,
            stock,
            images,
            createdBy: user._id,
        });

        return new Response(JSON.stringify({ success: true, product }), { status: 201 });

    } catch (err) {
        console.error("Create product error:", err);
        return new Response(JSON.stringify({ error: "Server error", details: err.message }), { status: 500 });
    }
}