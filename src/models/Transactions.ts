import mongoose from "mongoose"

const transactionSchema = new mongoose.Schema({
    userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    customerData: mongoose.SchemaTypes.Mixed,
    productsList: mongoose.SchemaTypes.Mixed,
    status: { type: String, enum: ['DELIVERED', 'CANCELED', 'PROCESSING'], required: true }
}, { timestamps: true })

export const transactionModel = mongoose.models.Transaction || mongoose.model('Transaction', transactionSchema)