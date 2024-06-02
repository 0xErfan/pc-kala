import connectToDB from "@/config/db";
import { transactionModel } from "@/models/Transactions";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    if (req.method !== 'POST') return res.status(421).json({ message: "This route can't be accessed without POST request_" })

    try {

        await connectToDB()

        const { userID } = req.body

        if (!userID) return res.status(422).json({ message: 'all needed data to update the transaction did not received' })

        const userTransactionsData = await transactionModel.find({ _id: userID })

        return res.status(200).json({ message: 'سفارش شما با موفقیت لغو شد', data: userTransactionsData })

    } catch (err) {
        console.log(err)
        return res.status(421).json({ message: 'خطای ناشناخته / بعدا تلاش کنید', err })
    }
}

export default handler;