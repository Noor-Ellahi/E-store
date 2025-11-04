// app/api/cart/[productId]/route.js

import { verifyToken } from "@/app/lib/authJWT/auth";
import { connectDb } from "@/app/lib/mongodb";
import Cart from "@/app/modals/Cart";


export async function DELETE(req, { params }) {
  try {
    await connectDb();


    const { decoded, error, status } = await verifyToken(req);
    if (error) return new Response(JSON.stringify({ error }), { status });

    const { userId } = await req.json();
    const { productId } = params;

    const cart = await Cart.findOne({ userId });

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
      JSON.stringify({ message: "Item removed successfully" }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Something went wrong" }),
      { status: 500 }
    );
  }
}