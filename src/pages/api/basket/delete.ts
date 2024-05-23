import connectToDB from "@/config/db";
import { BasketItemModel } from "@/models/UserRelatedSchemas";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    if (req.method !== 'DELETE') return res.status(421).json({ message: "This route can't be accessed without DELETE request_" })

    try {

        await connectToDB()

        const { productID, userID} = req.body

        if (!userID || !productID) return res.status(421).json({ message: 'not enough information make a product in basket!' })

        await BasketItemModel.findOneAndDelete({ productID, userID })

        return res.status(201).json({ message: 'محصول از سبد خرید حذف شد' })

    } catch (err) {
        console.log(err)
        return res.status(421).json({ message: 'خطای ناشناخته / بعدا تلاش کنید', err })
    }
}

export default handler;