// app/api/profile/route.js

// User auth checker

import { verifyToken } from "@/app/lib/authJWT/auth";
import { connectDb } from "@/app/lib/mongodb";
import UserModel from "@/app/modals/User";
import jwt from "jsonwebtoken";

export async function GET(req) {
    try {
        await connectDb()

        // const authHeader = req.headers.get("authorization")
        // if (!authHeader) {
        //     return new Response(
        //         JSON.stringify({ error: "Invalid or expired token" }),
        //         { status: 401 }
        //     )
        // }

        // const token = authHeader.split(" ")[1];

        // // verify token:
        // let decoded;
        // try {
        //     decoded = jwt.verify(token, process.env.JWT_SECRET)
        // } catch (err) {
        //     return new Response(
        //         JSON.stringify({ error: "Invalid or expired token" }),
        //         { status: 403 }
        //     );
        // }

        const { decoded, error, status } = verifyToken(req);
        if (error) return new Response(JSON.stringify({ error }), { status });



        const user = await UserModel.findById(decoded.id).select("-password")

        if (!user) {

            return new Response(
                JSON.stringify({ error: "User not found" }),
                { status: 404 }
            )
        }

        return new Response(
            JSON.stringify({ user }),
            { status: 200 }
        )
    } catch (error) {

        console.error(error);
        return new Response(JSON.stringify({ error: "Server error" }), {
            status: 500,
        });
    }
}