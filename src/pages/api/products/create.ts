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

        const { ...data } = req.body

        if (!data) return res.status(421).json({ message: 'requirement data to make product not found idiot!' })

        const newProduct = await ProductModel.create(data)

        console.log('created successfully :))', newProduct)

        return res.status(201).json({ message: 'Product created successfully :))' })

    } catch (err) {
        console.log(err)
        return res.status(421).json({ message: 'خطای ناشناخته / بعدا تلاش کنید', err })
    }
}

export default handler;