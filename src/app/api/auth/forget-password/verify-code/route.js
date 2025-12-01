// app/api/auth/forget-password/verify-code/route.js

import { connectDb } from "@/app/lib/mongodb";
import ResetModel from "@/app/modals/ResetCode";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function POST(req) {

    try {
        await connectDb()

        const body = await req.json()
        const { verifyCode } = body

        if (!verifyCode) {
            return new Response(
                JSON.stringify({ error: "Verification code required!" }),
                { status: 400 }
            )
        }

        const checkCode = await ResetModel.findOne({ code: verifyCode })

        if (!checkCode) {
            return new Response(
                JSON.stringify({ error: "Invalid code!" }),
                { status: 404 }
            )
        }

        if (checkCode.expiresAt.getTime() < Date.now()) {
            return new Response(
                JSON.stringify({ error: "Code expired!" }),
                { status: 410 }
            )
        }

        const token = jwt.sign(
            { userId: checkCode.userId },
            process.env.JWT_SECRET,
            { expiresIn: "10m" }
        );

        cookies().set("reset_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 10 * 60,
            path: "/",
        });

        // Delete the used reset code
        await ResetModel.deleteMany({ userId: checkCode.userId });

        return new Response(
            JSON.stringify({ message: "Code Verified!" , token})
            , { status: 200 }
        )




    } catch (error) {

        return new Response(
            JSON.stringify({ error: "Server side error!" }),
            { status: 500 }
        )
    }
}