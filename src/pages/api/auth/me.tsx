import connectToDB from "@/config/db";
import UserModel from "@/model/User";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    if (req.method !== 'POST') return res.status(421).json({ message: 'This route can be acceessed with post request!' })

    try {

        connectToDB()

        const { email, username } = req.body
        const userData = await UserModel.findOne({ $or: [{ email }, { username }] })

        if (!userData) return res.status(401).json({ message: 'No user exist with this username or password!' })

        return res.status(200).json(userData)
        
    } catch (err) { return res.status(421).json({ message: 'Serverside error occurred => ', err }) }
}

export default handler;