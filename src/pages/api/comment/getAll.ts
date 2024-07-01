import connectToDB from "@/config/db";
import { CommentModel } from "@/models/Comment";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    if (req.method !== 'POST') return res.status(421).json({ message: "This route can't be accessed without POST request_" })

    try {

        await connectToDB()

        const { currentPage, itemsPerPage = 12 } = req.body;
        const skippedComments = itemsPerPage * currentPage;

        const comments = await CommentModel.find({}).sort({ createdAt: -1 }).skip(skippedComments).limit(itemsPerPage)
            .populate('creator', ['email', 'username', 'nameLastName'])
            .populate('productID', ['name'])

        return res.status(201).json({ comments })

    } catch (err) {
        console.log(err)
        return res.status(421).json({ message: 'خطای ناشناخته / بعدا تلاش کنید', err })
    }
}

export default handler;