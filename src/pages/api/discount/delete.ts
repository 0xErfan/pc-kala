import connectToDB from "@/config/db";
import { BasketItemModel } from "@/models/UserRelatedSchemas";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    if (req.method !== 'DELETE') return res.status(421).json({ message: "This route can't be accessed without DELETE request_" })

    try {

        await connectToDB()

        const { productID, services, userID } = req.body

        const basketItemData = await BasketItemModel.findOne({ productID })

        if (!basketItemData) return res.status(421).json({ message: 'no basketItem found with this _id' })

        const removedDiscountFromBasket = { ...services } 

        for (let key in removedDiscountFromBasket) { // even the services object is updated from client(discount removed), we check again to be sure
            if (key.includes('کد تخفیف')) {
                delete removedDiscountFromBasket[key]
            }
        }

        await BasketItemModel.findOneAndUpdate({ productID, userID }, { services: removedDiscountFromBasket })

        return res.status(201).json({ message: 'کد تخفیف با موفقیت حذف شد' })

    } catch (err) {
        console.log(err)
        return res.status(421).json({ message: 'خطای ناشناخته / بعدا تلاش کنید', err })
    }
}

export default handler;