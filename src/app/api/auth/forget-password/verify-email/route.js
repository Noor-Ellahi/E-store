// app/api/auth/forget-password/verify-email/route.js

import { connectDb } from "@/app/lib/mongodb";
import UserModel from "@/app/modals/User";


export async function POST(req) {
    try {
        await connectDb()

        const body = await req.json()
        const { email } = body

        if (!email) {
            return new Response(
                JSON.stringify({ error: "Email Required to forget passcode" }),
                { status: 400 }
            )
        }

        const findEmail = await UserModel.findOne({ email }).select("-password")

        if (!findEmail) {
            return new Response(
                JSON.stringify({ error: "Email not found!" }),
                { status: 404 }
            )
        }

        // generate code & expiry
        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
        const expiry = Date.now() + 15 * 60 * 1000; // 15 minutes

        findEmail.resetCode = verificationCode
        findEmail.resetCodeExpiry = expiry
        await findEmail.save()


        // console.log(findEmail)

        return new Response(
            JSON.stringify({ message: "Verificantion code sent!", code: verificationCode })
            , { status: 200 }
        )




    } catch (error) {

        return new Response(
            JSON.stringify({ error: "Server side error" }),
            { status: 500 }
        )
    }
}
