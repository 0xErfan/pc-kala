import connectToDB from "@/config/db";
import { NotificationModel } from "@/models/UserRelatedSchemas";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    if (req.method !== 'POST') return res.status(401).json({ message: 'This route can not be accessed without POST request' })

    try {
        const userID = req.body;
        if (!userID) return res.status(421).json({ message: 'userID is needed to remove notification' })
        await connectToDB()
        await NotificationModel.deleteMany({ userID })
        return res.json({ message: 'پیام ها با موفقیت حذف شد' })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Internal error acquired' })
    }
};

export default handler;