import connectToDB from "@/config/db";
import ProductModel from "@/models/Product";
import { authUser } from "@/utils";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    if (req.method !== 'POST') return res.status(421).json({ message: "This route can't be accessed without POST request_" })

    try {

        const userData = await authUser({ cookie: req.cookies?.token })
        if (!userData || userData.role !== 'ADMIN') return res.status(404).json({ message: 'This route is protected buddy' })

        await connectToDB()

        const { ...data } = req.body || {}

        await ProductModel.create(data)

        return res.status(201).json({ message: 'محصول با موفقیت ساخته شد' })

    } catch (err) {
        console.log(err)
        return res.status(421).json({ message: 'خطای ناشناخته / بعدا تلاش کنید', err })
    }
}

export default handler;