import connectToDB from "@/config/db";
import { TransactionProductsTypes } from "@/global.t";
import ProductModel from "@/models/Product";
import { transactionModel } from "@/models/Transactions";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    if (req.method !== 'POST') return res.status(421).json({ message: "This route can't be accessed without POST request_" })

    try {

        await connectToDB()

        const { _id, status } = req.body

        const updatedTransaction = await transactionModel.findOneAndUpdate({ _id }, { status })

        if (status == 'CANCELED') {
            updatedTransaction.productsList.map(async (data: TransactionProductsTypes) => {
                await ProductModel.findOneAndUpdate({ _id: data.productID._id }, { $inc: { customers: -1 } })
            })
        }

        return res.status(200).json({ message: `وضعیت سفارش به ${status == 'CANCELED' ? '"لغو شده"' : status == 'PROCESSING' ? '"درحال ارسال"' : '"ارسال شده"'} تغییر یافت` })

    } catch (err) {
        console.log(err)
        return res.status(421).json({ message: 'خطای ناشناخته / بعدا تلاش کنید', err })
    }
}

export default handler;