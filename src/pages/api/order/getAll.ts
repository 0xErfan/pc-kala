import connectToDB from "@/config/db";
import { transactionModel } from "@/models/Transactions";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    if (req.method !== 'POST') return res.status(421).json({ message: "This route can't be accessed without POST request_" })

    try {

        await connectToDB()

        const { currentPage, itemsPerPage = 12 } = req.body;
        const skippedTransactions = itemsPerPage * (currentPage - 1);

        const allTransactions = await transactionModel.countDocuments()
        const availablePages = Math.ceil(allTransactions / itemsPerPage)

        const transactions = await transactionModel.find({}).sort({ createdAt: -1 }).skip(skippedTransactions).limit(itemsPerPage)
            .populate('creator')
            .populate('productID')

        return res.status(201).json({ transactions, availablePages })

    } catch (err) {
        console.log(err)
        return res.status(421).json({ message: 'خطای ناشناخته / بعدا تلاش کنید', err })
    }
}

export default handler;