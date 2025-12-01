import mongoose from "mongoose";


const ResetCodeSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    code: { type: String, required: true },
    expiresAt: { type: Date, required: true }
})


const ResetModel = mongoose.models.ResetCode || mongoose.model("ResetCode", ResetCodeSchema);
export default ResetModel;