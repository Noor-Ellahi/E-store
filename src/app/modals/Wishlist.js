import mongoose from "mongoose";


const wishSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserLists",
        required: true
    },
    wishItems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    }],

}, { timestamps: true })


const Wishlist = mongoose.models.Wishlist || mongoose.model("Wishlist", wishSchema)
export default Wishlist