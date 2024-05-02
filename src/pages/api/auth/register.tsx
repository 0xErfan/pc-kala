import connectToDB from "@/config/db";
import UserModel from "@/model/User";
import { hash } from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";
import { tokenGenerator } from "@/utils";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    if (req.method !== 'POST') return res.status(421).json({ message: "This route can't be acceessed without POST request!" })

    try {
        connectToDB()

        const { name, username, email, lastname } = req.body
        const password = await hash(req.body.password, 12)

        const userData = await UserModel.create({ name, username, email, password, lastname })

        const token = tokenGenerator({ email: userData.email }, 7)

        return res
            .setHeader("Set-Cookie", serialize("token", token, { httpOnly: true, path: "/", maxAge: 60 * 60 * 24 * 6 }))
            .status(201).json(userData)

    } catch (err) {
        console.log(err)
        return res.status(421).json({ message: 'خطای ناشناخته / بعدا تلاش کنید' })
    }
}

export default handler;