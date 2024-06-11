import { unknownObjProps } from "@/global.t";
import { CommentModel } from "@/models/Comment";
import { transactionModel } from "@/models/Transactions";
import { BasketItemModel, NotificationModel, WishModel } from "@/models/UserRelatedSchemas";
import { serialize } from "cookie";
import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    try {

        const tokenFromReq = req.cookies?.token
        const tokenFromBody = req.body

        const token = tokenFromBody || tokenFromReq // we can get the cookie from req body or the cookie api of next js  ?? req.body

        if (!token) return res.status(401).json({ message: 'Not loggedIn idiot' })

        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_PATH}/api/auth/me`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(token)
        })

        if (!response.ok) {
            res.setHeader("Set-Cookie", serialize("token", "", { httpOnly: true, path: "/", maxAge: 0 }))
            return res.status(401).json({ message: 'not logged in' })
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
        res.setHeader("Set-Cookie", serialize("token", "", { httpOnly: true, path: "/", maxAge: 0 }))
        return res.status(401).json({ message: 'not logged in' })
    }
}

export default handler;