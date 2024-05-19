import { CommentModel } from "@/models/Comment";
import { BasketItemModel, NotificationModel, OrderModel, WishModel } from "@/models/UserRelatedSchemas";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    if (req.method !== 'GET') return res.status(421).json({ message: "This route can't be accessed without GET request_" })

    try {

        const token = req.cookies?.token

        if (!token) return res.status(401).json({ message: 'Not loggedIn idiot' })

        const response = await fetch('http://localhost:3000/api/auth/me', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(token)
        })

        const userData = await response.json()

        const userRelatedModels = [NotificationModel, CommentModel, WishModel, OrderModel, BasketItemModel]

        const userRelatedData: {} = {}

        for (const Model of userRelatedModels) {

            const foundedData = await Model
                .find({ $or: [{ creator: userData._id }, { user: userData._id }] })
                .populate(['productID'])
                .exec()

            userRelatedData[Model.modelName] = foundedData
        }

        return res.status(200).json({ userData, userRelatedData })

    } catch (err) {
        console.log(err)
        return { props: { error: 'از اتصال به اینترنت اطمینان فرمایید' } }
    }
}

export default handler;