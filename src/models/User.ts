import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
    nameLastName: { type: String, default: null },
    username: { type: String, required: true, minLength: 3, maxLength: 20, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    meliCode: { type: Number, default: null, length: 10 },
    wishes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Wish' }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
    basket: [{ type: mongoose.Schema.Types.ObjectId, ref: 'BasketItem' }],
    notifications: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Notification' }],
}, { timestamps: true })

const UserModel = mongoose.models.User || mongoose.model('User', UserSchema);

export default UserModel;