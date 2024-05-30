import connectToDB from "@/config/db";
import { CommentModel } from "@/models/Comment";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    if (req.method !== 'POST') return res.status(421).json({ message: "This route can't be accessed without POST request_" })

    try {

        await connectToDB()

        const { _id } = req.body

        if (!_id) return res.status(422).json({ message: 'Hey we need an id to find comment for ya /: ' })

        const productComments = await CommentModel.find({ productID: _id }, ['username', 'body', 'rate', 'createdAt', 'isCreatedByCustomer']).populate(['productID', 'creator'])

        return res.status(201).json([...productComments])

    } catch (err) {
        console.log(err)
        return res.status(421).json({ message: 'خطای ناشناخته / بعدا تلاش کنید', err })
    }
}

export default handler;