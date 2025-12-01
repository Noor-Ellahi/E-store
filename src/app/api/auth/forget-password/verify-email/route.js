// app/api/auth/forget-password/verify-email/route.js

import { connectDb } from "@/app/lib/mongodb";
import ResetModel from "@/app/modals/ResetCode";
import UserModel from "@/app/modals/User";
import nodemailer from "nodemailer";

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
        // Remove old codes
        await ResetModel.deleteMany({ userId: findEmail._id });
        // Save new code

        await ResetModel.create({
            userId: findEmail._id,
            code: verificationCode,
            expiresAt: new Date(Date.now() + 10 * 60 * 1000) // 10 minutes from now
        });

        // Email setup
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_ADDRESS,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        await transporter.sendMail({
            from: process.env.EMAIL_ADDRESS,
            to: findEmail.email,
            subject: "Your Password Reset Code",
            text: `Your reset code is: ${verificationCode}. It will expire in 10 minutes.`
        });

        // const expiry = Date.now() + 15 * 60 * 1000; // 15 minutes

        // findEmail.resetCode = verificationCode
        // findEmail.resetCodeExpiry = expiry
        // await findEmail.save()


        // console.log(findEmail)

        return new Response(
            JSON.stringify({ message: "Verificantion code sent!" })
            , { status: 200 }
        )




    } catch (error) {

        return new Response(
            JSON.stringify({ error: "Server side error" }),
            { status: 500 }
        )
    }
}
