import connectToDB from "@/config/db";
import { NextApiRequest, NextApiResponse } from "next";
import ProductModel from "@/models/Product";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    if (req.method !== 'POST') return res.status(421).json({ message: "This route can't be acceessed without POST request_" })

    try {

        const { name } = req.query;

        const isCategoryValid = ['accessory', 'pc', 'parts', 'laptop', 'console'].find(cat => cat == name)

        if (!isCategoryValid?.length) return res.status(421).json({ message: 'invalid category name buddy' })

        await connectToDB()

        let products = await ProductModel.find({ category: name })

        if (!products) throw new Error("Invalid category name")

        return res.status(201).json(products)

    } catch (err) {
        console.log(err)
        return res.status(421).json({ message: 'خطای ناشناخته / بعدا تلاش کنید', err })
    }
}

export default handler;