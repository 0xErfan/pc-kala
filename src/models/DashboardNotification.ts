import mongoose from "mongoose";

const Notification = new mongoose.Schema({
    message: { type: String, required: true },
    creator: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
    target: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
    isSeen: { type: Number, default: false }
}, { timestamps: true })

export const DashboardNotificationModel = mongoose.models.dashboardNotification || mongoose.model('dashboardNotification', Notification)