import connectToDB from "@/config/db";
import { DiscountDataTypes } from "@/global.t";
import DiscountModel from "@/models/Discount";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    if (req.method !== 'POST') return res.status(421).json({ message: "This route can't be accessed without POST request_" })

    try {

        await connectToDB()

        const { code } = req.body

        if (!code) throw new Error("Required fields to use discount not passed !")

        const isDiscountCodeValid: DiscountDataTypes | null = await DiscountModel.findOne({ code })

        if (!isDiscountCodeValid || isDiscountCodeValid.maxUse <= 0) return res.status(421).json({ message: 'کد تخفیف نامعتبر است' })
        
        return res.status(201).json({ message: `کد تخفیف ${isDiscountCodeValid.value} تومانی برای خرید شما اعمال شد🥲` })

    } catch (err) {
        console.log(err)
        return res.status(421).json({ message: 'خطای ناشناخته / بعدا تلاش کنید', err })
    }
}

export default handler;