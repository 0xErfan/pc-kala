import connectToDB from "@/config/db";
import { NextApiRequest, NextApiResponse } from "next";
import ProductModel from "@/models/Product";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    if (req.method !== 'POST') return res.status(421).json({ message: "This route can't be accessed without POST request_" })

    try {

        const { name } = req.body;

        const isCategoryValid = ['accessory', 'pc', 'parts', 'laptop', 'console'].find(cat => cat == name)

        if (!isCategoryValid?.length) return res.status(400).json({ message: 'invalid category name buddy' })

        await connectToDB()

        let product = await ProductModel.find({ category: name })

        return res.status(201).json({ product })

    } catch (err) {
        console.log(err)
        return res.status(421).json({ message: 'خطای ناشناخته / بعدا تلاش کنید' })
    }
}

export default handler;