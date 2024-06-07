import mongoose from "mongoose"

const schema = new mongoose.Schema({
    code: { type: String, required: true },
    userID: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    isUsed: { type: Boolean, default: false }
}, { timestamps: true })

const ActiveDiscountModel = mongoose.models.ActiveDiscount || mongoose.model('ActiveDiscount', schema)

export default ActiveDiscountModel;