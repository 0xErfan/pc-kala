import connectToDB from "@/config/db";
import UserModel from "@/models/User";
import { authUser } from "@/utils";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    try {

        const userData = await authUser({ cookie: req.cookies?.token })
        if (!userData || userData.role !== 'ADMIN') return res.status(404).json({ message: 'This route is protected buddy' })

        await connectToDB()

        const allAdmins = await UserModel.find({ role: 'ADMIN' })

        return res.status(201).json({ message: 'out admin list is here', adminLists: allAdmins })

    } catch (err) {
        console.log(err)
        return res.status(421).json({ message: 'خطای ناشناخته / بعدا تلاش کنید', err })
    }
}

export default handler;