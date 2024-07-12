import connectToDB from "@/config/db";
import { CommentModel } from "@/models/Comment";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    try {

        await connectToDB()

        const customersReview = await CommentModel
            .find({ accepted: 1, isCreatedByCustomer: true })
            .sort({ createdAt: -1 })
            .limit(12)
            .populate('creator', ['nameLastName', ['username']])
            .populate('productID', 'image')

        return res.json({ customersReview })

    } catch (err) {
        console.log(err)
        return res.status(421).json({ message: 'خطای ناشناخته / بعدا تلاش کنید', err })
    }
}

export default handler;