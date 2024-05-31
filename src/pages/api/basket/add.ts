import connectToDB from "@/config/db";
import { BasketItemModel } from "@/models/UserRelatedSchemas";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    if (req.method !== 'POST') return res.status(421).json({ message: "This route can't be accessed without POST request_" })

    try {

        await connectToDB()

        const { productID, userID, count, services } = req.body

        if (!userID || !productID) return res.status(421).json({ message: 'not enough information make a product in basket!' })

        const isProductExistInBasket = await BasketItemModel.findOne({ productID, userID })

        if (isProductExistInBasket) { // if product exist, it means we are trying to update the current product fields
            await BasketItemModel.findOneAndUpdate({ productID, userID }, { count: count ?? isProductExistInBasket.count + 1, services })
            return res.status(201).json({ message: count != isProductExistInBasket.count ? 'تعداد محصول بروزرسانی شد' : 'خدمات محصول بروزرسانی شد (:' })
        }

        await BasketItemModel.create({ productID, userID, count: count ?? 1, services })

        return res.status(201).json({ message: 'محصول به سبد خرید اضافه شد' })

    } catch (err) {
        console.log(err)
        return res.status(421).json({ message: 'خطای ناشناخته / بعدا تلاش کنید', err })
    }
}

export default handler;