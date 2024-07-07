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
        if (!_id) return res.status(421).json({ message: 'need user id to change the role' })

        const userTarget = await UserModel.findOne({ _id })
        if (!userTarget) return res.status(422).json({ message: 'No user found with this _id' })

        userTarget.role = userTarget.role === 'ADMIN' ? 'USER' : 'ADMIN'
        await userTarget.save()

        return res.status(200).json({ message: `نقش کاربر مورد نظر تغییر یافت` })

    } catch (err) {
        console.log(err)
        return res.status(421).json({ message: 'خطای ناشناخته / بعدا تلاش کنید', err })
    }
}

export default handler;