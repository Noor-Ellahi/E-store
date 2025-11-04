// app/api/products/[id]/route.js

import { connectDb } from "@/app/lib/mongodb";
import Product from "@/app/modals/Product";



export async function GET(req , {params}) {
    try {
        await connectDb()

        const {slug} = params;

        const product = await Product.findById(slug);

        if(!product){
            return new Response(
                JSON.stringify({error : "Product not found"}),
                {status : 404}
            )
        }

        return new Response(
            JSON.stringify({product}),
            {status : 200}
        )
        



    } catch (error) {
    
        console.error("Error fetching product:", error);
        return new Response(
            JSON.stringify({error : "Server side error"}),
            {status : 500}
        )
    }
}