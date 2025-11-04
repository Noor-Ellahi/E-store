// app/api/auth/forget-password/new-password/route.js

import { connectDb } from "@/app/lib/mongodb";
import UserModel from "@/app/modals/User";
import bcrypt from "bcrypt"

export async function POST(req) {

    try {
        await connectDb()

        const body = await req.json()
        const { resetCode, newPassword } = body

        if (!resetCode || !newPassword) {
            return new Response(
                JSON.stringify({ error: "All field required!" }),
                { status: 400 }
            )
        }

        const findUser = await UserModel.findOne({ resetCode })

        if (!findUser) {
            return new Response(
                JSON.stringify({ error: "User not found!" }),
                { status: 404 }
            )
        }

        if (findUser.resetCodeExpiry.getTime() < Date.now()) {
            return new Response(
                JSON.stringify({ error: "Code expired!" }),
                { status: 410 }
            )
        }



        const hashedPassword = await bcrypt.hash(newPassword, 10)
        findUser.password = hashedPassword
        findUser.resetCode = null; 
        findUser.resetCodeExpiry = null;
        await findUser.save()

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