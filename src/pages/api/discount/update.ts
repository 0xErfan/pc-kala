import connectToDB from "@/config/db";
import { DiscountDataTypes } from "@/global.t";
import DiscountModel from "@/models/Discount/Discount";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    if (req.method !== 'POST') return res.status(421).json({ message: "This route can't be accessed without POST request_" })

    try {

        await connectToDB()

        const { code } = req.body

        if (!code) throw new Error("Required fields to use discount not passed !")

        const isDiscountCodeValid: DiscountDataTypes | null = await DiscountModel.findOne({ code })

        await DiscountModel.findOneAndUpdate({ code }, { maxUse: isDiscountCodeValid?.maxUse! - 1 })

        return res.json({ message: 'discount maxUse updated successfully.' })

    } catch (err) {
        console.log(err)
        return res.status(421).json({ message: 'خطای ناشناخته / بعدا تلاش کنید', err })
    }
}

export default handler;