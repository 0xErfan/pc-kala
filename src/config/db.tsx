import mongoose from "mongoose";

const connectToDB = () => {
    try {
        mongoose.connect('mongodb://localhost:27017/pc-kala')
        console.log('Connected to db successfully :)) ')
    } catch (err) { console.log('Failed to connect => ', err) }
}

export default connectToDB;