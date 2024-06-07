import connectToDB from "@/config/db";
import { BasketItemModel } from "@/models/UserRelatedSchemas";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    if (req.method !== 'DELETE') return res.status(421).json({ message: "This route can't be accessed without DELETE request_" })

    try {

        const { productID, userID } = req.body
        
        if (!userID || !productID) return res.status(421).json({ message: 'not enough information make a product in basket!' })

        await connectToDB()

        const productToDelete = await BasketItemModel.findOne({ productID, userID })

        const isProductServiceHaveDiscount = Object.keys(productToDelete.services).some(data => {
            if (data.includes('کد تخفیف')) return true
        })

        if (isProductServiceHaveDiscount) { // if the product that user want to remove from basket have the discount in its services object, we want to swap the discount data to another user basket product

            const allProductIDsInUserBasket = await BasketItemModel.find({ userID })

            if (allProductIDsInUserBasket.length != 1) {

                const availableProductIdToAddDiscount = [...allProductIDsInUserBasket].find(data => data.productID != productID).productID // as we are removing the product, we have to swap the discount value that is in the product services to another product

                await BasketItemModel.findOneAndUpdate({ productID: availableProductIdToAddDiscount, userID }, { services: productToDelete.services })
            }
        }

        await BasketItemModel.findOneAndDelete({ productID, userID })

        return res.status(201).json({ message: 'محصول از سبد خرید حذف شد' })

    } catch (err) {
        console.log(err)
        return res.status(421).json({ message: 'خطای ناشناخته / بعدا تلاش کنید', err })
    }
}

export default handler;