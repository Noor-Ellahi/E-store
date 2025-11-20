import { connectDb } from "@/app/lib/mongodb";
import { cookies } from "next/headers";

import jwt from "jsonwebtoken";
import Wishlist from "@/app/modals/Wishlist";


export async function DELETE(req, { params }) {
    await connectDb()

    const cookieStore = await cookies()
    const token = cookieStore.get("token")?.value
    console.log("HERE", token)
    if (!token) return new Response(JSON.stringify({ message: "Unauthorized!" }), { status: 401 })

    try {
        const { wishId } = await params
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const findWish = await Wishlist.findOne({ userId: decoded.id }).populate('wishItems')
        // findWish.wishItems = findWish.wishItems.filter(
        //     (item) => item.toString() !== wishId
        // );  
        findWish.wishItems = findWish.wishItems.filter(
            (item) => item._id.toString() !== wishId
        );
        await findWish.save()
        return new Response(
            JSON.stringify({ message: "Removed from wishlist", findWish }),
            { status: 200 }
        );
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: "Server error" }), {
            status: 500,
        });
    }
}