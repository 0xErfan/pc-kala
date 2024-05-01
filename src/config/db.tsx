import mongoose from "mongoose";

const connetToDB = () => {
    try {
        mongoose.connect('mongodb://localhost:27017/pc-kala')
    } catch (err) { console.log('Failed to connect => ', err) }
}

export default connetToDB;