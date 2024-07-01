import connectToDB from "@/config/db";
import { CommentModel } from "@/models/Comment";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    if (req.method !== 'POST') return res.status(421).json({ message: "This route can't be accessed without POST request_" })

    try {

        await connectToDB()

        const { commentID, shouldAccept = 1 } = req.body

        if (!commentID) throw new Error("Required fields to create comment not passed !")

        await CommentModel.findOneAndUpdate({ _id: commentID }, { accepted: shouldAccept == 1 ? 1 : -1 })

        return res.status(201).json({ message: `کامنت مورد نظر با موفقیت ${shouldAccept == 1 ? 'تایید' : 'رد'} شد` })

    } catch (err) {
        console.log(err)
        return res.status(421).json({ message: 'خطای ناشناخته / بعدا تلاش کنید', err })
    }
}

export default handler;