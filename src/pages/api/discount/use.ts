import connectToDB from "@/config/db";
import { DiscountDataTypes } from "@/global.t";
import ActiveDiscountModel from "@/models/Discount/ActiveDiscount";
import DiscountModel from "@/models/Discount/Discount";
import { BasketItemModel } from "@/models/UserRelatedSchemas";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    if (req.method !== 'POST') return res.status(421).json({ message: "This route can't be accessed without POST request_" })

    try {

        await connectToDB()

        const { code, basketID, userID } = req.body

        const isDiscountCodeValid: DiscountDataTypes | null = await DiscountModel.findOne({ code })

        if (!isDiscountCodeValid || isDiscountCodeValid.maxUse <= 0) return res.status(421).json({ message: 'کد تخفیف نامعتبر است' })

        const basketData = await BasketItemModel.findOne({ _id: basketID, userID })

        if (!basketData) return res.status(421).json({ message: 'invalid basketID bro' })

        const updatedBasketServices = { ...basketData.services, [`کد تخفیف ${isDiscountCodeValid.value} تومانی`]: isDiscountCodeValid.value * -1 } // add the discount price to the product services to update the total price(silly logic)

        await BasketItemModel.findOneAndUpdate(
            { _id: basketID, userID },
            {
                services: { ...updatedBasketServices }
            })

            await ActiveDiscountModel.create({ code, userID })

        return res.status(201).json({ message: `کد تخفیف ${isDiscountCodeValid.value.toLocaleString() } تومانی برای خرید شما اعمال شد🥲` })

    } catch (err) {
        console.log(err)
        return res.status(421).json({ message: 'خطای ناشناخته / بعدا تلاش کنید', err })
    }
}

export default handler;