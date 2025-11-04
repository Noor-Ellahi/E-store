// // api/admin/make-admin/route.js

// import { connectDb } from "@/app/lib/mongodb";
// import UserModel from "@/app/modals/User";


// export async function POST(req) {

//     await connectDb()

//     const body = await req.json()
//     const {email , secret} = body


//     if(secret !== process.env.ADMIN_SECRET){
//         return new Response(
//             JSON.stringify({error : "Secret not matched!"}),
//             {status : 403}
//         )
//     }

//     const user = await UserModel.findOneAndUpdate(
//         {email},
//         {role : "admin"},
//         {new :true}
//     )


//     return new Response(
//         JSON.stringify({message : "User promoted to admin" , user}),
//         {statue : 200}
//     )
// }