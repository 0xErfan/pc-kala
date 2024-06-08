import connectToDB from "@/config/db";
import { NextApiRequest, NextApiResponse } from "next";
import ProductModel from "@/models/Product";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    if (req.method !== 'POST') return res.status(421).json({ message: "This route can't be accessed without POST request_" })


    try {

        const { _id } = req.body

        await connectToDB()

        const product = await ProductModel.findOne({ _id})

        if (!product) return res.status(421).json({ message: 'no product found with this id' })

        return res.status(200).json(product)

    } catch (err) {
        console.log(err)
        return res.status(421).json({ message: 'خطای ناشناخته / بعدا تلاش کنید', err })
    }
}

export default handler;