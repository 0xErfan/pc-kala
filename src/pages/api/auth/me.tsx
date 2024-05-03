import connectToDB from "@/config/db";
import UserModel from "@/model/User";
import { tokenDecoder } from "@/utils";
import { NextApiRequest, NextApiResponse } from "next";
import { redirect } from "next/dist/server/api-utils";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    if (req.method !== 'GET') return res.status(421).json({ message: "This route can't be acceessed without GET request_" })

    try {

        connectToDB()

        const token: string | undefined = req.cookies?.token

        if (!token) return res.status(401).json({ message: 'You are not loggged in' })

        const verifiedToken = tokenDecoder(token)

        const userData = await UserModel.findOne({ email: verifiedToken.email })

        if (!userData) return res.status(401).json({ message: 'No user exist with this username or password!' })

        return res.status(200).json(userData)

    } catch (err) {
        console.log(err)
        return res.status(421).json({ message: 'خطای ناشناخته / بعدا تلاش کنید' })
    }
}

export default handler;