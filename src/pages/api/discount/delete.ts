import connectToDB from "@/config/db";
import DiscountModel from "@/models/Discount";
import { BasketItemModel } from "@/models/UserRelatedSchemas";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    if (req.method !== 'DELETE') return res.status(421).json({ message: "This route can't be accessed without DELETE request_" })

    try {

        await connectToDB()

        const { productID, services } = req.body

        const basketItemData = await BasketItemModel.findOne({ _id: productID })

        if (!basketItemData) return res.status(421).json({ message: 'no basketItem found with this _id' })

        // const removedDiscountFromBasket = { ...services }

        // for (let key in removedDiscountFromBasket) {
        //     if (key.includes('کد تخفیف')) {
        //         delete removedDiscountFromBasket[key]
        //     }
        // }

        const ddd = await BasketItemModel.findOneAndUpdate({ _id: productID }, { services })
        console.log(ddd)
        return res.status(201).json({ message: 'کد تخفیف با موفقیت حذف شد' })

    } catch (err) {
        console.log(err)
        return res.status(421).json({ message: 'خطای ناشناخته / بعدا تلاش کنید', err })
    }
}

export default handler;