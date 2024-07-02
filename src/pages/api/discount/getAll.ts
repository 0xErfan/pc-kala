import connectToDB from "@/config/db";
import DiscountModel from "@/models/Discount/Discount";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    if (req.method !== 'POST') return res.status(421).json({ message: "This route can't be accessed without POST request_" })

    try {

        await connectToDB()

        const { currentPage, itemsPerPage = 12 } = req.body;
        const skippedDiscounts = itemsPerPage * (currentPage - 1);

        const allDiscounts = await DiscountModel.countDocuments()
        const availablePages = Math.ceil(allDiscounts / itemsPerPage)

        const newDiscounts = await DiscountModel.find({}).sort({ createdAt: -1 }).skip(skippedDiscounts).limit(itemsPerPage)

        return res.status(201).json({ newDiscounts, availablePages })

    } catch (err) {
        console.log(err)
        return res.status(421).json({ message: 'خطای ناشناخته / بعدا تلاش کنید', err })
    }
}

export default handler;