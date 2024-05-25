import mongoose from "mongoose"

const transactionSchema = new mongoose.Schema({
    id: { type: String, required: true },
    userID: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
    customerData: mongoose.SchemaTypes.Mixed,
    productsList: mongoose.SchemaTypes.Mixed
})

export const transactionModel = mongoose.models.Transaction || mongoose.model('Transaction', transactionSchema)