import connectToDB from "@/config/db";
import UserModel from "@/models/User";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    if (req.method !== 'POST') return res.status(421).json({ message: "This route can't be accessed without POST request_" })

    try {

        await connectToDB()

        const { currentPage, itemsPerPage = 12 } = req.body;
        const skippedComments = itemsPerPage * (currentPage - 1);

        const allComments = await UserModel.countDocuments()
        const availablePages = Math.ceil(allComments / itemsPerPage)

        const users = await UserModel.find({}).sort({ createdAt: -1 }).skip(skippedComments).limit(itemsPerPage)

        return res.status(201).json({ users, availablePages })

    } catch (err) {
        console.log(err)
        return res.status(421).json({ message: 'خطای ناشناخته / بعدا تلاش کنید', err })
    }
}

export default handler;