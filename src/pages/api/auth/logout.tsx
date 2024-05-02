import connectToDB from "@/config/db";
import { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    if (req.method !== 'GET') return res.status(421).json({ message: "This route can't be acceessed without GET request!" })

    try {
        connectToDB()
        return res
            .setHeader("Set-Cookie", serialize("token", "", { httpOnly: true, path: "/", maxAge: 0 }))
            .status(201).json({ message: 'خروج از حساب با موفقیت انجام شد' })

    } catch (err) {
        console.log(err)
        return res.status(421).json({ message: 'خطای ناشناخته / بعدا تلاش کنید' })
    }
}

export default handler;