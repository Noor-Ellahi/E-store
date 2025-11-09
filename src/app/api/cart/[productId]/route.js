// app/api/cart/[productId]/route.js


import { verifyToken } from "@/app/lib/authJWT/auth";
import { connectDb } from "@/app/lib/mongodb";
import Cart from "@/app/modals/Cart";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";


export async function DELETE(req, { params }) {
  try {
    await connectDb();


    // const { decoded, error, status } = await verifyToken(req);
    // if (error) return new Response(JSON.stringify({ error }), { status });

    // // const { userId } = await req.json();
    // const  userId  = decoded.id

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value; // token is now available

    if (!token) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // const { productId } = await params;
      const productId = params.productId



      const cart = await Cart.findOne({ userId: decoded.id });
      console.log("cart items:", cart.items);
      console.log("productId:", productId);
      if (!cart)
        return new Response(
          JSON.stringify({ error: "Cart not found" }),
          { status: 404 }
        );

      cart.items = cart.items.filter(
        (item) => item.productId.toString() !== productId
      );

      await cart.save();

      return new Response(
        JSON.stringify({ items: cart.items, message: "Item removed successfully" }),
        { status: 200 }
      );
    } catch (error) {
      return new Response(
        JSON.stringify({ error: "Something went wrong" }),
        { status: 409 }
      );
    }
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Something went wrong" }),
      { status: 500 }
    );
  }
}



// export async function PUT(req) {


//   await connectDb()
//   const cookiesStore = await cookies()
//   const token = cookiesStore.get('token')?.value
//   if (!token) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });

//   try {
//     const quantity = await req.json()


//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const cart = await Cart.findOneAndUpdate(decoded.id , {quantity} );
//     return Response.json({ success: true });
//   } catch (error) {
//     return Response.json({ error: "Something went wrong!" });
//   }




//   }


