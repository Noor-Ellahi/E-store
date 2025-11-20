import { connectDb } from "@/app/lib/mongodb"
import { cookies } from "next/headers"
import jwt from "jsonwebtoken";
import Wishlist from "@/app/modals/Wishlist";



export async function GET() {
    await connectDb()
    const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value;
    if (!token) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 })


    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const userWish = await Wishlist.findOne({ userId: decoded.id }).populate('wishItems')
        // if(!decoded){
        //     return new Response(JSON.stringify({message : "Unauthorized!"}) , {status :401})
        // }

        return new Response(JSON.stringify({createdTime : userWish?.createdAt || [],  cart: userWish?.wishItems || [] }), { status: 200 });

    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: "Server error" }), {
            status: 500,
        });
    }
}


export async function POST(req) {

    await connectDb()

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 })
    console.log(token)
    try {
        const { productId } = await req.json();
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        let wish = await Wishlist.findOne({ userId: decoded.id })
        if (!wish) {
            wish = new Wishlist({
                userId: decoded.id,
                wishItems: [productId]
            })
        } else {
            // Already exists?
            const exists = wish.wishItems.includes(productId)
            if (!exists) {
                wish.wishItems.push(productId)
            }
        }

        await wish.save()
        return new Response(
            JSON.stringify({ message: "wish added successfully" }),
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