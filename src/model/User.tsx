import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true, minLength: 3, maxLength: 15 },
    lastname: { type: String, required: true, minLength: 3, maxLength: 15 },
    username: { type: String, required: true, minLength: 3, maxLength: 20, unique: true, index: 1 },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minLength: 7, maxLength: 30 },
    wishes: { type: Array, default: [] },
    comments: { type: Array, default: [] },
    orders: { type: Array, default: [] },
    notifications: { type: Array, default: [] },
}, { timestamps: true })

const UserModel = mongoose.models.User || mongoose.model('User', UserSchema);

export default UserModel;