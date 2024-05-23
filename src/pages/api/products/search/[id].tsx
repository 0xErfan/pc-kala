import connectToDB from "@/config/db";
import { NextApiRequest, NextApiResponse } from "next";
import ProductModel from "@/models/Product";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    if (req.method !== 'POST') return res.status(421).json({ message: "This route can't be acceessed without POST request_" })
    

    try {

        const { id } = req.query

        await connectToDB()

        const product = await ProductModel.findOne({ _id: id })

        if (!product) return res.status(421).json({ message: 'no prodct found with this id haha' })

        return res.status(200).json(product)

    } catch (err) {
        console.log(err)
        return res.status(421).json({ message: 'خطای ناشناخته / بعدا تلاش کنید', err })
    }
}

export default handler;