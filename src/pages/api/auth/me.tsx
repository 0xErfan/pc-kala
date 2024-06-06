import connectToDB from "@/config/db";
import UserModel from "@/models/User";
import { tokenDecoder } from "@/utils";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    try {

        await connectToDB()

        const token: string | undefined = req.cookies?.token ?? req.body

        if (!token) {
            res.setHeader('Set-Cookie', 'token=deleted; path=/; maxAge=0');
            return res.status(401).json({ message: 'You are not logged in' })
        }

        const verifiedToken = tokenDecoder(token) as { email: string }

        const userData = await UserModel.findOne({ email: verifiedToken.email })

        if (!userData) {
            return res.setHeader('token', 'expires=0;').status(401).json({ message: 'No user exist with this username or password!' })
        }

        return res.status(200).send(userData)

    } catch (err) {
        console.log(err)
        return res.status(421).json({ message: 'خطای ناشناخته / بعدا تلاش کنید' })
    }
}

export default handler;