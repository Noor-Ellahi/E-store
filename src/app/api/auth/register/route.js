// app/api/register/route.js
import { connectDb } from "@/app/lib/mongodb";
import UserModel from "@/app/modals/User";

// Lib:
import bcrypt from "bcrypt"


export async function POST(req) {

  try {
    await connectDb();

    const body = await req.json();
    const {name , email , password} = body;

    if(!name ||!email || !password){
      return new Response(
        JSON.stringify({error : "All field are required"}),
        {status : 400}
      )
    }

    const existingUser = await UserModel.findOne({email})

    if(existingUser){
      JSON.stringify({error : "User already exist"}),
      {status : 409}
    }

    const hashedPassword = await bcrypt.hash(password , 10)

    const newUser = await UserModel.create({name , email , password : hashedPassword});

    return new Response(
      JSON.stringify({message : "User registered" , user : newUser}),
      {status : 200}
    )


  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
    });
  }





  // return new Response(
  //   JSON.stringify({ message: "Hello from Next.js API 🚀" }),
  //   { status: 200 }
  // );
}