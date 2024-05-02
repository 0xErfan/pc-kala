import connectToDB from "@/config/db";
import UserModel from "@/model/User";
import { hash } from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    if (req.method !== 'POST') return res.status(421).json({ message: 'This route can be acceessed with post request!' })

    try {
        connectToDB()

        const password = await hash(req.body.password, 12)

        const { name, username, email, lastname } = req.body

        const data = await UserModel.create({ name, username, email, password, lastname })

        return res.status(201).json({ message: 'User created successfully :)', data })
    } catch (err) { return res.status(421).json({ message: 'Serverside error occurred => ', err }) }
}

export default handler;