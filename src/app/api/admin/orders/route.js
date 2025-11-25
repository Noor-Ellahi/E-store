// import { verifyToken } from "@/app/lib/authJWT/auth";
// import Order from "@/app/modals/Order";
// // import Order from "@/app/modals/Order";



// export async function GET(req) {
//   try {
//     const user = await verifyToken(req);
//     if (!user || user.role != "admin") return new Response(JSON.stringify({ error: "Forbidden" }), { status: 403 });

//     const orders = await Order.find().populate("user").populate("products.productId");
//     return new Response(JSON.stringify(orders), { status: 200 });
//   } catch (err) {
//     return new Response(JSON.stringify({ error: err.message }), { status: 500 });
//   }
// }