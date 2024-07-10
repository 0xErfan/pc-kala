import connectToDB from "@/config/db";
import ProductModel from "@/models/Product";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    if (req.method !== 'POST') return res.status(421).json({ message: "This route can't be accessed without POST request_" })

    try {

        await connectToDB()

        const { currentPage, itemsPerPage = 12 } = req.body;
        const skippedProducts = itemsPerPage * (currentPage - 1);

        const allProducts = await ProductModel.countDocuments()
        const availablePages = Math.ceil(allProducts / itemsPerPage)

        const products = await ProductModel.find({}).skip(skippedProducts).limit(itemsPerPage)

        return res.status(201).json({ products, availablePages })

    } catch (err) {
        console.log(err)
        return res.status(421).json({ message: 'خطای ناشناخته / بعدا تلاش کنید', err })
    }
}

export default handler;