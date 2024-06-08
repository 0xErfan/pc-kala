import connectToDB from "@/config/db";
import { WishModel } from "@/models/UserRelatedSchemas";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    if (req.method !== 'GET') return res.status(421).json({ message: "This route can't be accessed without GET request_" })

    try {

        await connectToDB()

        const token = req.cookies?.token

        if (!token) return res.status(401).json({ message: 'You are not logged in idiot!' })

        const response = await fetch('https://master--beamish-trifle-8c913b.netlify.app/api/auth/me', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(token)
        })

        const userData = await response.json()

        const userWishes = await WishModel.find({ $or: [{ creator: userData._id }, { user: userData._id }] }).populate(['productID']).exec()

        return res.status(200).json({ userWishes })

    } catch (err) {
        console.log(err)
        return { props: { error: 'از اتصال به اینترنت اطمینان فرمایید' } }
    }
}

export default handler;