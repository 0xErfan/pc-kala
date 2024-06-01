import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
    body: { type: String, required: true },
    rate: { type: Number, default: 1, min: 0, max: 5 },
    productID: { type: mongoose.Types.ObjectId, required: true, ref: 'Product' },
    creator: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
    isCreatedByCustomer: { type: Boolean, default: false },
    accepted: { type: Boolean, default: true }
}, { timestamps: true })

export const CommentModel = mongoose.models.Comment || mongoose.model('Comment', CommentSchema)