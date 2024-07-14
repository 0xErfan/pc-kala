import mongoose from "mongoose"

const Visit = new mongoose.Schema({
    date: { type: Date, required: true },
    count: { type: Number, default: 1 }
}, { timestamps: true })

const VisitModel = mongoose.models.Visit || mongoose.model('Visit', Visit);

export default VisitModel;