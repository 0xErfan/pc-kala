import connectToDB from "@/config/db";
import UserModel from "@/models/User";
import { hash } from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";
import { tokenGenerator } from "@/utils";
import { NotificationModel } from "@/models/UserRelatedSchemas";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    if (req.method !== 'POST') return res.status(421).json({ message: "This route can't be accessed without POST request!" })

    try {
        connectToDB()

        const { name, username, email, lastname } = req.body
        const password = await hash(req.body.password, 12)

        const userData = await UserModel.create({ name, username, email, password, lastname })

        await NotificationModel.create({ userID: userData._id, body: 'به خانواده پیسی کالا خوش امدید :)❤️' }) // a sign up notification message for our users:)

        const token = tokenGenerator(userData.email, 7)

        return res
            .setHeader("Set-Cookie", serialize("token", token, { httpOnly: true, path: "/", maxAge: 60 * 60 * 24 * 7 }))
            .status(201).json(userData)

    } catch (err: any) {

        const duplicatedInputs = Object.keys(err.errorResponse?.keyPattern).join('')

        if (duplicatedInputs) {
            const duplicatedProp = duplicatedInputs == 'email' ? 'ایمیل' : 'نام کاربری'
            return res.status(421).json({ message: ` حسابی با این ${duplicatedProp} وجود دارد ` })
        }

        return res.status(421).json({ message: 'خطای ناشناخته / بعدا تلاش کنید' })
    }
}

export default handler;