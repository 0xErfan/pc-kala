import connectToDB from "@/config/db";
import UserModel from "@/models/User";
import { tokenDecoder } from "@/utils";
import { JwtPayload } from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    // if (req.method !== 'GET' || req.method !== 'POST') return res.status(421).json({ message: "This route can't be accessed without GET or POST request_" })

    try {

        connectToDB()

        const token: string | undefined = req.cookies?.token || req.body

        if (!token) {
            res.setHeader('Set-Cookie', 'token=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT');
            return res.status(401).json({ message: 'You are not logged in' })
        }

        const verifiedToken: string | JwtPayload = tokenDecoder(token)

        const userData = await UserModel.findOne({ email: verifiedToken.email })

        if (!userData) {
            res.setHeader('Set-Cookie', 'token=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT');
            return res.status(401).json({ message: 'No user exist with this username or password!' })
        }

        return res.status(200).json(userData)

    } catch (err) {
        console.log(err)
        return res.status(421).json({ message: 'خطای ناشناخته / بعدا تلاش کنید' })
    }
}

export default handler;