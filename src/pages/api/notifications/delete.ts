import connectToDB from "@/config/db";
import { NotificationModel } from "@/models/UserRelatedSchemas";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    if (req.method !== 'POST') return res.status(421).json({ message: "This route can't be accessed without POST request_" })

    try {

        await connectToDB()

        const { id } = req.body

        if (!id) return res.status(421).json({ message: 'id filed is required to remove notification!' })

        await NotificationModel.findOneAndDelete({ _id: id })

        return res.status(201).json({ message: 'Notification deleted successfully :))' })

    } catch (err) {
        console.log(err)
        return res.status(421).json({ message: 'خطای ناشناخته / بعدا تلاش کنید', err })
    }
}

export default handler;