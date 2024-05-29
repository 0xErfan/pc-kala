import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
    body: { type: String, required: true },
    rate: { type: Number, default: 1, min: 0, max: 5 },
    productID: { type: mongoose.Types.ObjectId, required: true, ref: 'Product' },
    creator: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
    createdAt: { type: Date, default: Date.now(), immutable: true }
})

export const CommentModel = mongoose.models.Comment || mongoose.model('Comment', CommentSchema)