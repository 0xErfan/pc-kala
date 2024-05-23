import connectToDB from "@/config/db";
import { BasketItemModel } from "@/models/UserRelatedSchemas";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    if (req.method !== 'POST') return res.status(421).json({ message: "This route can't be accessed without POST request_" })

    try {

        await connectToDB()

        const { productID, userID, count } = req.body

        if (!userID || !productID || !count) return res.status(421).json({ message: 'not enough information make a product in basket!' })

        const isProductExistInBasket = await BasketItemModel.findOne({ productID, userID })

        if (isProductExistInBasket) {
            await BasketItemModel.findOneAndUpdate({ productID, userID }, { count: count ?? isProductExistInBasket.count + 1 })
            return res.status(201).json({ message: 'تعداد محصول بروزرسانی شد' })
        }

        await BasketItemModel.create({ productID, userID, count })

        return res.status(201).json({ message: 'محصول به سبد خرید اضافه شد' })

    } catch (err) {
        console.log(err)
        return res.status(421).json({ message: 'خطای ناشناخته / بعدا تلاش کنید', err })
    }
}

export default handler;