import mongoose from "mongoose"

const schema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    value: { type: Number, required: true },
    maxUse: { type: Number, required: true },
}, { timestamps: true })

const DiscountModel = mongoose.models.Discount || mongoose.model('Discount', schema)

export default DiscountModel;