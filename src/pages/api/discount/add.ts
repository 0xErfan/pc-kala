import connectToDB from "@/config/db";
import DiscountModel from "@/models/Discount";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    if (req.method !== 'POST') return res.status(421).json({ message: "This route can't be accessed without POST request_" })

    try {

        await connectToDB()

        const discountData = req.body

        if (!discountData) throw new Error("Required fields to create discount not passed !")

        const isDiscountCodeUnique = await DiscountModel.findOne({ code: discountData.code })

        if (isDiscountCodeUnique) return res.status(421).json({ message: 'کد تخفیف دیگری با این کد موجود است ):' })

        await DiscountModel.create({ ...discountData })

        return res.status(201).json({ message: 'کد تخفیف با موفقیت اضافه شد.' })

    } catch (err) {
        console.log(err)
        return res.status(421).json({ message: 'خطای ناشناخته / بعدا تلاش کنید', err })
    }
}

export default handler;