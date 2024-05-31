import connectToDB from "@/config/db";
import { transactionModel } from "@/models/Transactions";
import { BasketItemModel, NotificationModel, OrderModel } from "@/models/UserRelatedSchemas";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    if (req.method !== 'POST') return res.status(421).json({ message: "This route can't be accessed without POST request_" })

    try {

        await connectToDB()

        const { userID, customerData, totalPrice } = req.body

        const userOrders = await BasketItemModel.find({ userID }, ['-__v', '-userID', '-_id']).populate('productID').exec() // find user basket products

        if (!userOrders.length) return res.status(422).json({ message: 'محصولی برای سفارش وجود نداره😂' })

        const userOrdersPlain = userOrders.map(order => order.toObject()); // use toObject so we can see the populated products data in client

        const newOrderTransaction = await transactionModel.create({ productsList: userOrdersPlain, userID, customerData, totalPrice, status: 'PROCESSING' })

        await BasketItemModel.deleteMany({ userID }) // clear the user basket

        await NotificationModel.create({ userID, body: `خرید شما با کد پیگیری ${String(newOrderTransaction._id).slice(-8, -1).toUpperCase()} ثبت و درحال ارسال است :)` })

        return res.status(200).json({ message: '(: سفارش شما با موفقیت ثبت گردید', transaction: newOrderTransaction })

    } catch (err) {
        console.log(err)
        return res.status(421).json({ message: 'خطای ناشناخته / بعدا تلاش کنید', err })
    }
}

export default handler;