import connetToDB from "@/config/db";
import UserModel from "@/model/User";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    if (req.method !== 'POST') return res.status(421).json({ message: 'This route can be acceessed with post request!' })

    try {
        connetToDB()
        const { name, email } = req.body
        const userData = await UserModel.where("name").equals(name).where("email").equals(email)
        return res.status(200).json(userData)
    } catch (err) { return res.status(421).json({ message: 'Serverside error occurred => ', err }) }
}

export default handler;