import connectToDB from "@/config/db";
import { CommentModel } from "@/models/Comment";
import { NotificationModel } from "@/models/UserRelatedSchemas";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    if (req.method !== 'POST') return res.status(421).json({ message: "This route can't be acceessed without POST request_" })

    try {

        await connectToDB()

        const commentBody = req.body

        if (!commentBody) throw new Error("Required fields to create comment not passed !")

        const newComment = await CommentModel.create({ ...commentBody })

        await NotificationModel.create({ userID: newComment.creator, body: 'کامنت شما با موفقیت ثبت و بعد از بررسی منتشر خواهد شد.🥲' })

        return res.status(201).json({ message: 'کامنت شما با موفقیت ثبت شد' })

    } catch (err) {
        console.log(err)
        return res.status(421).json({ message: 'خطای ناشناخته / بعدا تلاش کنید', err })
    }
}

export default handler;