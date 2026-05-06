// app/api/auth/login/route.js
import { connectDb } from "@/app/lib/mongodb";
import UserModel from "@/app/modals/User";

// Lib:
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
// import { cookies } from "next/headers";



export async function POST(req) {
    
    try {
        await connectDb()

    const body = await req.json()
    const {email , password} = body

    if(!email || !password){
        
        // return new Response(
        //     JSON.stringify({error: "Both field are Required"}),
        //     {status : 400}
        // )
        return NextResponse.json(
        { error: "Both field are Required" },
        { status: 400 }
      );
    }

    const findUser = await UserModel.findOne({email})
    if(!findUser){
        // return new Response(
        //     JSON.stringify({error : "User not found!"}),
        //     {status : 404}
        // )
        return NextResponse.json(
        { error: "User not found!" },
        { status: 404 }
      );
    }


    const isPassMatch = await bcrypt.compare(password , findUser.password)

    if(!isPassMatch){
        // return new Response(
        //     JSON.stringify({error: "Incorrect Password"}),
        //     {status : 401}
        // )
        return NextResponse.json(
        { error: "Incorrect Password" },
        { status: 401 }
      );
    }

    // ✅ Create JWT token
    const token = jwt.sign(
      { id: findUser._id, email: findUser.email, role: findUser.role },  // payload
      process.env.JWT_SECRET,                       // secret
      { expiresIn: "30m"}                           // expiry
    );


    if (findUser.email === process.env.ADMIN_EMAIL) {
        findUser.role = "admin";

        await findUser.save()
    }

    // ✅ Store token in cookies
    // await cookies().set({
    //   name: "token",
    //   value: token,
    //   httpOnly: true,  // cannot be accessed by JS ggggg process.env.NODE_ENV === "production"
    //   secure: false, // true for HTTPS
    //   sameSite: "strict", // protect from CSRF
    //   path: "/", // accessible in whole site
    //   maxAge: 1000* 60 * 30, // 1 day
    // });

    const response = NextResponse.json(
      {
        message: "Logged in successfully",
        token,
        user: {
          id: findUser._id,
          name: findUser.name,
          email: findUser.email,
        },
      },
      { status: 200 }
    );

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 30, // ⚠️ seconds, not ms
    });

    return response;



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
