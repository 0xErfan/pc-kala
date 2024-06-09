import { unknownObjProps } from "@/global.t";
import { CommentModel } from "@/models/Comment";
import { transactionModel } from "@/models/Transactions";
import { BasketItemModel, NotificationModel, WishModel } from "@/models/UserRelatedSchemas";
import { authUser } from "@/utils";
import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    try {

        const userData = await authUser({ isFromClient: false, cookie: req.cookies?.token })

        if (!userData) return res.status(401).json({ message: 'This route is protected buddy' })

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