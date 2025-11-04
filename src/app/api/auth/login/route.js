// app/api/auth/login/route.js
import { connectDb } from "@/app/lib/mongodb";
import UserModel from "@/app/modals/User";

// Lib:
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";


export async function POST(req) {
    
    try {
        await connectDb()

    const body = await req.json()
    const {email , password} = body

    if(!email || !password){
        
        return new Response(
            JSON.stringify({error: "Both field are Required"}),
            {status : 400}
        )
    }

    const findUser = await UserModel.findOne({email})
    if(!findUser){
        return new Response(
            JSON.stringify({error : "User not found!"}),
            {status : 404}
        )
    }


    const isPassMatch = await bcrypt.compare(password , findUser.password)

    if(!isPassMatch){
        return new Response(
            JSON.stringify({error: "Incorrect Password"}),
            {status : 401}
        )
    }

    // ✅ Create JWT token
    const token = jwt.sign(
      { id: findUser._id, email: findUser.email, role: findUser.role },  // payload
      process.env.JWT_SECRET,                       // secret
      { expiresIn: "1h" }                           // expiry
    );


    if (findUser.email === process.env.ADMIN_EMAIL) {
        findUser.role = "admin";

        await findUser.save()
    }




    return new Response(
        JSON.stringify({
            message : "Logged in successfully" ,
            token : token,
            user : {
                id : findUser._id,
                name : findUser.name,
                email : findUser.email
            }
        }),
        {status : 200}
    )


    




    } 
    catch (error) {
        console.log("Err Occured :" , error)
        return new Response(
            JSON.stringify({error : "Server Error"}),
            {status : 500}
        )    
    }
    
    
}















// export async function POST(req){
//     try {
        
//         const body = await req.json()
//         const {name} = body
        
//         // Respond back"

//         return new Response(
//             JSON.stringify({message : `Hello ${name} ! ☻ `}),
//             {status : 200}
//         )

//     } catch (error) {
//         return new Response(
//             JSON.stringify({error : "Invalid Req"}),
//             {status :400}
//         )
//     }
// }
