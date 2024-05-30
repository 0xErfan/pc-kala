import connectToDB from "@/config/db";
import UserModel from "@/models/User";
import { tokenDecoder } from "@/utils";
import { JwtPayload } from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import { cookies } from "next/headers";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    try {

        await connectToDB()

        const token: string | undefined = req.cookies?.token ?? req.body

        if (!token) {
            res.setHeader('Set-Cookie', 'token=deleted; path=/; maxAge=0');
            return res.status(401).json({ message: 'You are not logged in' })
        }

        const verifiedToken: string | JwtPayload = tokenDecoder(token)

        const userData = await UserModel.findOne({ email: verifiedToken?.email })

        if (!userData) {
            cookies().set('token', '', { expires: -1 });
            return res.status(401).json({ message: 'No user exist with this username or password!' })
        }

        return res.status(200).send(userData)

    } catch (err) {
        console.log(err)
        return res.status(421).json({ message: 'خطای ناشناخته / بعدا تلاش کنید' })
    }
}

export default handler;