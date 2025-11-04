// app/api/auth/forget-password/verify-code/route.js

import { connectDb } from "@/app/lib/mongodb";
import UserModel from "@/app/modals/User";

export async function POST(req) {
    
    try {
        await connectDb()

        const body = await req.json()
        const {verifyCode} = body

        if(!verifyCode){
            return new Response(
                JSON.stringify({error : "Verification code required!"}),
                {status : 400}
            )
        }

        const checkCode = await UserModel.findOne({resetCode : verifyCode})

        if(!checkCode){
            return new Response(
                JSON.stringify({error : "Invalid code!"}),
                {status : 404}
            )
        }

        if(checkCode.resetCodeExpiry.getTime() < Date.now()){
            return new Response(
                JSON.stringify({error : "Code expired!"}),
                {status : 410}
            )
        }

        return new Response(
            JSON.stringify({message :"Code Verified!"})
            ,{status : 200}
        )




    } catch (error) {
        
        return new Response(
            JSON.stringify({error : "Server side error!"}),
            {status : 500}
        )
    }
}