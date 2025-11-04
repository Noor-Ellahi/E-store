import mongoose from "mongoose";


const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String },
    price: { type: Number, required: true },
    category: { type: String },
    stock: { type: Number, default: 0 },
    images: { type: [String], default: [] },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "UserLists" },
} , {timestamps : true})


const Product = mongoose.models.Product || mongoose.model("Product" , ProductSchema)

export default Product