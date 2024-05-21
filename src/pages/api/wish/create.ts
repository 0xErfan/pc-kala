import connectToDB from "@/config/db";
import { WishModel } from "@/models/UserRelatedSchemas";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    if (req.method !== 'POST') return res.status(421).json({ message: "This route can't be accessed without POST request_" })

    try {

        await connectToDB()

        const { creator, productID } = req.body

        if (!creator || !productID) return res.status(421).json({ message: 'requirement data to make product not found idiot!' })

        const isWishExist = await WishModel.findOne({ productID, creator }) // if the product exist => remove it(like toggle) else: add wish

        await WishModel[isWishExist ? 'findOneAndDelete' : 'create']({ productID, creator })
        
        if (isWishExist) {
            return res.status(200).json({ message: 'محصول از لیست علاقه مندی ها حذف شد' })
        } else {
            return res.status(201).json({ message: 'محصول به لیست علاقه مندی ها اضافه شد' })
        }


    } catch (err) {
        console.log(err)
        return res.status(421).json({ message: 'خطای ناشناخته / بعدا تلاش کنید', err })
    }
}

export default handler;