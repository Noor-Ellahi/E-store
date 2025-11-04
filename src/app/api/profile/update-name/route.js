// app/api/profile/update-name/route.js

import { verifyToken } from "@/app/lib/authJWT/auth";
import { connectDb } from "@/app/lib/mongodb";
import UserModel from "@/app/modals/User";


export async function PATCH(req){

    try {
        await connectDb()

        const {decoded , error , status} = verifyToken(req)
        if (error){
            return new Response(
                JSON.stringify({error}), {status}
            )
        }

        // Updating name:
        const {name} = await req.json()
        if(!name) {
            return new Response(
                JSON.stringify({
                    error: "Username Required",
                    status : 400
                })
            )
        }


        const updatedUser = await UserModel.findByIdAndUpdate(
            decoded.id,
            {$set : {name}},
            {new : true}
        ).select("-password")


        return new Response(
            JSON.stringify({message : "Username Updated!" , user : updatedUser}),
            {status: 200}
        )




    } catch (error) {
        console.log("error" , error)
        return new Response(
            JSON.stringify({error: "Server side Error"}),
            {status : 500}
        )
    }




}



