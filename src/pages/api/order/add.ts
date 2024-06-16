import connectToDB from "@/config/db";
import { TransactionProductsTypes, productDataTypes } from "@/global.t";
import ActiveDiscountModel from "@/models/Discount/ActiveDiscount";
import DiscountModel from "@/models/Discount/Discount";
import ProductModel from "@/models/Product";
import { transactionModel } from "@/models/Transactions";
import { BasketItemModel, NotificationModel } from "@/models/UserRelatedSchemas";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    if (req.method !== 'POST') return res.status(421).json({ message: "This route can't be accessed without POST request_" })

    try {

        await connectToDB()

        const { userID, customerData, totalPrice } = req.body

        const userOrders = await BasketItemModel.find({ userID }, ['-__v', '-userID', '-_id']).populate('productID').lean() // find user basket products

        if (!userOrders.length) return res.status(422).json({ message: 'محصولی برای سفارش وجود نداره😂' })

        const checkForDiscount = await ActiveDiscountModel.findOne({ userID, isUsed: false })

        if (checkForDiscount) {

            const discountTarget = await DiscountModel.findOne({ code: checkForDiscount.code })
            if (discountTarget.maxUse <= 0) return res.status(421).json({ message: 'کد تخفیف شما منقضی شده. برای ادامه خرید کد تخفیف را حذف کنید' })

            await DiscountModel.findOneAndUpdate({ code: checkForDiscount.code }, { maxUse: discountTarget.maxUse - 1 })
            await ActiveDiscountModel.findOneAndUpdate({ userID, isUsed: false }, { isUsed: true }) // so user can't use this discount anymore
        }

        const newOrderTransaction = await transactionModel.create({ productsList: userOrders, userID, customerData, totalPrice, status: 'PROCESSING' })

        userOrders.map(async (data: TransactionProductsTypes) => {
            await ProductModel.findOneAndUpdate({ _id: data.productID._id }, { $inc: { customers: 1 } })
        })

        await BasketItemModel.deleteMany({ userID }) // clear the user basket

        await NotificationModel.create({ userID, body: `خرید شما با کد پیگیری ${String(newOrderTransaction._id).slice(-8, -1).toUpperCase()} ثبت و درحال ارسال است :)` })

        return res.status(200).json({ message: '(: سفارش شما با موفقیت ثبت گردید', transaction: newOrderTransaction })

    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'خطای ناشناخته / بعدا تلاش کنید', err })
    }
}

export default handler;