import { unknownObjProps } from "@/global.t";
import { CommentModel } from "@/models/Comment";
import { transactionModel } from "@/models/Transactions";
import { BasketItemModel, NotificationModel, WishModel } from "@/models/UserRelatedSchemas";
import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    try {

        const token = req.cookies?.token ?? req.body // we can get the cookie from req body or the cookie api of next js

        if (!token) return res.status(401).json({ message: 'Not loggedIn idiot' })

        const response = await fetch('https://0xerfan.github.io/pc-kala/api/auth/me', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(token)
        })

        if (!response.ok) {
            return res.setHeader('Set-Cookie', 'token=; Expires=Thu, 01 Jan 1970 00:00:00 UTC; Path=/; HttpOnly');
        }

        const userData = await response.json()

        const userRelatedModels = [NotificationModel, WishModel, BasketItemModel, transactionModel, CommentModel]

        const userRelatedData: unknownObjProps<string | number> = {}

        mongoose.set('strictPopulate', false); // if the 'productID' didn't exist to populate, we won't get any error

        for (const Model of userRelatedModels) {

            const foundedData = await Model
                .find({ $or: [{ creator: userData._id }, { user: userData._id }, { userID: userData._id }] })
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