// api/products/all-products/route.js

import { connectDb } from "@/app/lib/mongodb";
import Product from "@/app/modals/Product";


export async function GET(req) {

    try {
        await connectDb()

        const getItems = await Product.find()


        return new Response(
            JSON.stringify({ getItems })
            ,{status : 200}
        )
    } catch (error) {

        return new Response(
            JSON.stringify({error : "Failed to fetch products"}),
            {status :500}
        )
    }
}