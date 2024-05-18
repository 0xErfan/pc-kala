import connectToDB from "@/config/db";
import { WishModel } from "@/models/UserRelatedSchemas";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    if (req.method !== 'POST') return res.status(421).json({ message: "This route can't be accessed without POST request_" })

    try {

        await connectToDB()

        const { creator, productID } = req.body

        if (!creator || !productID) return res.status(421).json({ message: 'requirement data to make product not found idiot!' })

        const newWish = await WishModel.create({ creator, productID })

        console.log('created successfully :))', newWish)

        return res.status(201).json({ message: 'Product created successfully :))' })

    } catch (err) {
        console.log(err)
        return res.status(421).json({ message: 'خطای ناشناخته / بعدا تلاش کنید', err })
    }
}

export default handler;