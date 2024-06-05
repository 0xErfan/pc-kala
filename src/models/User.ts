import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
    nameLastName: { type: String, default: "" },
    username: { type: String, required: true, minLength: 3, maxLength: 20, unique: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: Number, default: '', length: 11 },
    password: { type: String, required: true },
    nationalCode: { type: Number, default: "", length: 10 },
    role: { type: String, default: 'USER', enum: ['USER', 'ADMIN'] }
}, { timestamps: true })

const UserModel = mongoose.models.User || mongoose.model('User', UserSchema);

export default UserModel;