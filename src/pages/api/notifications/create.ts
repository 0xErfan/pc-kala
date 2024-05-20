import connectToDB from "@/config/db";
import { NotificationModel } from "@/models/UserRelatedSchemas";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    if (req.method !== 'POST') return res.status(421).json({ message: "This route can't be accessed without POST request_" })

    try {

        await connectToDB()

        const { userID, body } = req.body

        if (!userID || !body) return res.status(421).json({ message: 'userID and body is required to make a new notification!' })

        await NotificationModel.create({ userID, body })

        return res.status(201).json({ message: 'Notification created successfully :))' })

    } catch (err) {
        console.log(err)
        return res.status(421).json({ message: 'خطای ناشناخته / بعدا تلاش کنید', err })
    }
}

export default handler;