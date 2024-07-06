import connectToDB from "@/config/db";
import UserModel from "@/models/User";
import { authUser } from "@/utils";
import { NextApiRequest, NextApiResponse } from "next";


const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    if (req.method !== 'POST') return res.status(421).json({ message: "This route can't be accessed without POST request_" })

    try {

        await connectToDB()

        const user = await authUser({ isFromClient: false, cookie: req.cookies?.token })
        if (user?.role !== 'ADMIN') return res.status(421).json({ message: 'This route is protected' })

        const { _id } = req.body
        if (!_id) return res.status(421).json({ message: 'need user id to ban' })

        await UserModel.findOneAndDelete({ _id })

        return res.json({ message: 'حساب کاربر با موفقیت خذف شد' })

    } catch (err) {
        console.log(err)
        return res.status(421).json({ message: 'خطای ناشناخته / بعدا تلاش کنید', err })
    }
}

export default handler;