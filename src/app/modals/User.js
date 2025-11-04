// modals/User.js
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        resetCode: { type: String },
        resetCodeExpiry: { type: Date },
        role: { type: String, enum: ["user","admin"], default: "user" }
    },
    { timestamps: true }
)

// const UserModal = mongoose.model("user-lists", UserSchema)
const UserModel = mongoose.models.UserLists || mongoose.model("UserLists", UserSchema, "user-lists");

export default UserModel;