import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
    nameLastName: { type: String, default: null },
    username: { type: String, required: true, minLength: 3, maxLength: 20, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    meliCode: { type: Number, default: null, length: 10 },
    wishes: { type: Array, default: [] },
    comments: { type: Array, default: [] },
    orders: { type: Array, default: [] },
    basket: { type: Array, default: [] },
    notifications: { type: Array, default: [] },
}, { timestamps: true })

const UserModel = mongoose.models.User || mongoose.model('User', UserSchema);

export default UserModel;