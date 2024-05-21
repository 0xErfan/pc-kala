import connectToDB from "@/config/db";
import UserModel from "@/models/User";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    if (req.method !== 'POST') return res.status(421).json({ message: "This route can't be accessed without POST request_" })

    try {

        await connectToDB()

        const { prop, value, _id } = req.body

        if (!prop || !value) return res.status(421).json({ message: 'اطلاعات را به درستی وارد کنید' })

        const updatedUser = await UserModel.findOneAndUpdate({ _id }, { [prop]: value })

        console.log('this is the update for user', updatedUser)

        return res.status(200).json({ message: 'اطلاعات شما بروزرسانی شد.' })

    } catch (err) {
        console.log(err)
        return res.status(421).json({ message: 'خطای ناشناخته / بعدا تلاش کنید', err })
    }
}

export default handler;