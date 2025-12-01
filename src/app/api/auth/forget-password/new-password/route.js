// app/api/auth/forget-password/new-password/route.js

import { connectDb } from "@/app/lib/mongodb";
import ResetModel from "@/app/modals/ResetCode";
import UserModel from "@/app/modals/User";
import bcrypt from "bcrypt"
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function POST(req) {

    try {
        await connectDb()

        const cookieStore = await cookies();
        const token = cookieStore.get("reset_token")?.value; // token is now available

        if (!token) {
            return new Response(JSON.stringify({ error: "ReReset now!" }), { status: 401 });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const body = await req.json()
        const { newPassword, RePassword } = body

        if (!newPassword || !RePassword) {
            return new Response(
                JSON.stringify({ error: "Both field required!" }),
                { status: 400 }
            )
        }
        if (newPassword !== RePassword) {
            return new Response(
                JSON.stringify({ error: "Password not match!" }),
                { status: 400 }
            )
        }

        const findUser = await UserModel.findOne({ _id: decoded.userId })

        if (!findUser) {
            return new Response(
                JSON.stringify({ error: "User not found!" }),
                { status: 404 }
            )
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10)

        findUser.password = hashedPassword
        await findUser.save()

        cookies().set("reset_token", "", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            path: "/",
            maxAge: 0, // expire immediately
        });
        await ResetModel.deleteMany({ userId: decoded.userId });

        // if (findUser.resetCodeExpiry.getTime() < Date.now()) {
        //     return new Response(
        //         JSON.stringify({ error: "Code expired!" }),
        //         { status: 410 }
        //     )
        // }



        // const hashedPassword = await bcrypt.hash(newPassword, 10)
        // findUser.password = hashedPassword
        // findUser.resetCode = null;
        // findUser.resetCodeExpiry = null;
        // await findUser.save()

        return new Response(
            JSON.stringify({ message: "Password updated successfully. Please log in again." }),
            { status: 200 }
        )

    } catch (error) {

        return new Response(
            JSON.stringify({ error: "Server side error" }),
            { status: 500 }
        )

    }


}