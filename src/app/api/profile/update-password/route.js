// app/api/profile/update-password/route.js

import { connectDb } from "@/app/lib/mongodb";
import UserModel from "@/app/modals/User";
import { verifyToken } from "@/app/lib/authJWT/auth";
import bcrypt from "bcrypt"

export async function PATCH(req) {
    
    try {
        await connectDb()

        const {decoded , error , status} = verifyToken(req)
        if(error){
            return new Response(
                JSON.stringify({error}, {status})
            )
        }

        const {oldPassword , newPassword} = await req.json()

        if(!oldPassword || !newPassword){
            return new Response(
                JSON.stringify({error : "Both old and new password required!"}) , {status : 400}
            )
        }

        const user = await UserModel.findById(decoded.id)

        if(!user){
            return new Response(
                JSON.stringify({error : "User not Found!"} , {status : 404})
            )
        }

        const isMatch = await bcrypt.compare(oldPassword , user.password)

        if(!isMatch){
            return new Response(
                JSON.stringify({error: "Old password incorrect"}) , {status : 400}
            )
        }

        const hashedPassword = await bcrypt.hash(newPassword , 10)

        user.password = hashedPassword
        await user.save()

        return new Response(
            JSON.stringify({message : "Password updated successfully"}) , {status : 200}
        )

    } catch (error) {
        
        return new Response(
            JSON.stringify({error : "Server side Error"}),
            {status : 500}
        )
    }
}
