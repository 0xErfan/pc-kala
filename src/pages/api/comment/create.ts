import connectToDB from "@/config/db";
import { CommentModel } from "@/models/Comment";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    if (req.method !== 'POST') return res.status(421).json({ message: "This route can't be acceessed without POST request_" })

    try {

        await connectToDB()

        const commentBody = req.body

        if (!commentBody) throw new Error("Required fields to create comment not passed !")

        await CommentModel.create({ ...commentBody })

        return res.status(201).json({ message: 'Comment created successfully :))' })

    } catch (err) {
        console.log(err)
        return res.status(421).json({ message: 'خطای ناشناخته / بعدا تلاش کنید', err })
    }
}

export default handler;