import mongoose from "mongoose";

const ordeSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "UserLists", required: true },
    products: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
            quantity: { type: Number, required: true, default: 1 },
        },
    ],
    totalPrice: { type: Number, required: true },
    status: { type: String, default: "pending" }, // pending, shipped, delivered
}, { timestamps: true })


const Order = mongoose.models.Order || mongoose.model("Order" , ordeSchema)

export default Order