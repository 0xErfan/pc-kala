import connectToDB from "@/config/db";
import UserModel from "@/models/User";
import { tokenDecoder } from "@/utils";
import { JwtPayload } from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    if (req.method !== 'GET') return res.status(421).json({ message: "This route can't be acceessed without GET request_" })

    try {

        connectToDB()

        const token: string | undefined = req.cookies?.token

        if (!token) return res.status(401).json({ message: 'You are not loggged in' })

        const verifiedToken: string | JwtPayload = tokenDecoder(token)

        console.log('verified token: => ', verifiedToken.email)

        const userData = await UserModel.findOne({ email: verifiedToken.email })

        if (!userData) return res.status(401).json({ message: 'No user exist with this username or password!' })

        return res.status(200).json(userData)

    } catch (err) {
        console.log(err)
        return res.status(421).json({ message: 'خطای ناشناخته / بعدا تلاش کنید' })
    }
}

export default handler;