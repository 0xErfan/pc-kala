import mongoose from "mongoose"

const transactionSchema = new mongoose.Schema({
    customerData: mongoose.SchemaTypes.Mixed,
    productsList: mongoose.SchemaTypes.Mixed,
    status: { type: String, enum: ['DELIVERED', 'CANCELED', 'PROCESSING'] }
}, { timestamps: true })

export const transactionModel = mongoose.models.Transaction || mongoose.model('Transaction', transactionSchema)